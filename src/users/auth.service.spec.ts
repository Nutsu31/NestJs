import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const fakeUserService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed', async () => {
    const user = await service.signUp('asd@asd.com', '123123');

    expect(user.password).not.toEqual('123123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('thows an error if user signs up with email that is in use', async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: 'password' } as User]);
    try {
      await service.signUp('asd@asd.com', '123123');
    } catch (error) {
      done();
    }
  });

  it('throws if signin is called with an unused email', async (done) => {
    try {
      await expect(service.signIn('assd@asd.com', '123123'));
    } catch (error) {
      done();
    }
  });

  it('throws if an invalid password provided', async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'asdasdasd@gmail.com', password: '123123' } as User,
      ]);
    try {
      await service.signIn('asdasd@gmail.com', '321321');
    } catch (error) {
      done();
    }
  });
});

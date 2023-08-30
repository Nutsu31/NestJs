import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logSave() {
    console.log('User saved with id ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('User saved with id ', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('User saved with id ', this.id);
  }
}

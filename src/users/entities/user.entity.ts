import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/entities/report.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Report, (report) => report?.user)
  reports: Report[];

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

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 120,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 120,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    nullable: true,
    unique: true,
  })
  phoneNumber: string;
}

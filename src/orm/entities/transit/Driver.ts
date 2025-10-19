import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { DriverAssignment } from './DriverAssignment';
import { Trip } from './Trip';

@Entity({ name: 'водії' })
@Unique('водії_email_key', ['email'])
@Unique('водії_телефон_key', ['phone'])
@Unique('водії_дані_водійського_посвідче_key', ['licenseData'])
export class Driver {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ name: 'телефон', type: 'text' })
  phone: string;

  @Column({ name: 'піб', type: 'text' })
  fullName: string;

  @Column({ name: 'дані_водійського_посвідчення', type: 'text' })
  licenseData: string;

  @Column({ name: 'паспортні_дані', type: 'jsonb' })
  passportData: Record<string, unknown>;

  @OneToMany(() => DriverAssignment, (assignment) => assignment.driver)
  assignments: DriverAssignment[];

  @OneToMany(() => Trip, (trip) => trip.driver)
  trips: Trip[];
}

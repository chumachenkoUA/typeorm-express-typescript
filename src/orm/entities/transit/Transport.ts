import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { DriverAssignment } from './DriverAssignment';
import { Route } from './Route';
import { TransportType } from './TransportType';
import { Trip } from './Trip';
import { VehicleGpsLog } from './VehicleGpsLog';

@Entity({ name: 'транспорти' })
@Unique('транспорти_бортовий_номер_key', ['boardNumber'])
@Check(`"місткість" > 0`)
export class Transport {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'бортовий_номер', type: 'text' })
  boardNumber: string;

  @ManyToOne(() => TransportType, (transportType) => transportType.transports)
  @JoinColumn({ name: 'тип_транспорту_id' })
  transportType: TransportType;

  @Column({ name: 'місткість', type: 'integer' })
  capacity: number;

  @ManyToOne(() => Route, (route) => route.transports)
  @JoinColumn({ name: 'маршрут_id' })
  route: Route;

  @OneToMany(() => VehicleGpsLog, (log) => log.transport)
  gpsLogs: VehicleGpsLog[];

  @OneToMany(() => DriverAssignment, (assignment) => assignment.transport)
  assignments: DriverAssignment[];

  @OneToMany(() => Trip, (trip) => trip.transport)
  trips: Trip[];
}

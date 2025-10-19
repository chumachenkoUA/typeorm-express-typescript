import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { RouteDirection } from './enums';
import { RoutePoint } from './RoutePoint';
import { RouteStop } from './RouteStop';
import { Schedule } from './Schedule';
import { Transport } from './Transport';
import { TransportType } from './TransportType';
import { Trip } from './Trip';

@Entity({ name: 'маршрути' })
@Unique('маршрути_тип_транспорту_id_номер__key', ['transportType', 'number', 'direction'])
@Check(`"напрямок" IN ('прямий','зворотній')`)
export class Route {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => TransportType, (transportType) => transportType.routes)
  @JoinColumn({ name: 'тип_транспорту_id' })
  transportType: TransportType;

  @Column({ name: 'номер', type: 'text' })
  number: string;

  @Column({ name: 'напрямок', type: 'text' })
  direction: RouteDirection;

  @Column({ name: 'активний', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => RouteStop, (routeStop) => routeStop.route)
  routeStops: RouteStop[];

  @OneToMany(() => RoutePoint, (routePoint) => routePoint.route)
  routePoints: RoutePoint[];

  @OneToMany(() => Transport, (transport) => transport.route)
  transports: Transport[];

  @OneToMany(() => Trip, (trip) => trip.route)
  trips: Trip[];

  @OneToOne(() => Schedule, (schedule) => schedule.route)
  schedule: Schedule;
}

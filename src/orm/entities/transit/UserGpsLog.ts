import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Passenger } from './Passenger';

@Entity({ name: 'логи_gps_користувачів' })
export class UserGpsLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Passenger, (passenger) => passenger.gpsLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'користувач_id' })
  passenger: Passenger;

  @Column({ name: 'довгота', type: 'numeric', precision: 10, scale: 7 })
  longitude: string;

  @Column({ name: 'широта', type: 'numeric', precision: 10, scale: 7 })
  latitude: string;

  @Column({ name: 'зафіксовано', type: 'timestamp without time zone', default: () => 'now()' })
  recordedAt: Date;
}

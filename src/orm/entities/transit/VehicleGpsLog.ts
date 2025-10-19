import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Transport } from './Transport';

@Entity({ name: 'логи_gps_транспорту' })
export class VehicleGpsLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Transport, (transport) => transport.gpsLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'транспорт_id' })
  transport: Transport;

  @Column({ name: 'довгота', type: 'numeric', precision: 10, scale: 7 })
  longitude: string;

  @Column({ name: 'широта', type: 'numeric', precision: 10, scale: 7 })
  latitude: string;

  @Column({ name: 'зафіксовано', type: 'timestamp without time zone', default: () => 'now()' })
  recordedAt: Date;
}

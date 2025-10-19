import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Driver } from './Driver';
import { Transport } from './Transport';

@Entity({ name: 'призначення_водіїв_транспорту' })
@Unique('призначення_вод_водій_id_транспо_key', ['driver', 'transport', 'assignedAt'])
export class DriverAssignment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Driver, (driver) => driver.assignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'водій_id' })
  driver: Driver;

  @ManyToOne(() => Transport, (transport) => transport.assignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'транспорт_id' })
  transport: Transport;

  @Column({ name: 'призначено', type: 'timestamp without time zone', default: () => 'now()' })
  assignedAt: Date;
}

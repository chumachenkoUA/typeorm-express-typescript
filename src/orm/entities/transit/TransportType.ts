import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Route } from './Route';
import { Transport } from './Transport';

@Entity({ name: 'типи_транспорту' })
@Unique('типи_транспорту_назва_key', ['name'])
export class TransportType {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'назва', type: 'text' })
  name: string;

  @OneToMany(() => Route, (route) => route.transportType)
  routes: Route[];

  @OneToMany(() => Transport, (transport) => transport.transportType)
  transports: Transport[];
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { RouteStop } from './RouteStop';

@Entity({ name: 'зупинки' })
@Unique('зупинки_назва_довгота_широта_key', ['name', 'longitude', 'latitude'])
export class Stop {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'назва', type: 'text' })
  name: string;

  @Column({ name: 'довгота', type: 'numeric', precision: 10, scale: 7 })
  longitude: string;

  @Column({ name: 'широта', type: 'numeric', precision: 10, scale: 7 })
  latitude: string;

  @OneToMany(() => RouteStop, (routeStop) => routeStop.stop)
  routeStops: RouteStop[];
}

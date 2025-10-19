import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Route } from './Route';
import { Stop } from './Stop';

@Entity({ name: 'зупинки_маршрутів' })
@Unique('зупинки_маршрут_маршрут_id_зупин_key', ['route', 'stop'])
@Unique('зупинки_маршрут_попередня_зупин_key', ['previousStop'])
@Unique('зупинки_маршрут_наступна_зупин_key', ['nextStop'])
export class RouteStop {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Route, (route) => route.routeStops, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'маршрут_id' })
  route: Route;

  @ManyToOne(() => Stop, (stop) => stop.routeStops)
  @JoinColumn({ name: 'зупинка_id' })
  stop: Stop;

  @ManyToOne(() => RouteStop, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'попередня_зупинка_id' })
  previousStop?: RouteStop | null;

  @OneToMany(() => RouteStop, (child) => child.previousStop)
  nextChildren: RouteStop[];

  @ManyToOne(() => RouteStop, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'наступна_зупинка_id' })
  nextStop?: RouteStop | null;

  @OneToMany(() => RouteStop, (child) => child.nextStop)
  previousChildren: RouteStop[];
}

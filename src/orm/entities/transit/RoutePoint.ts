import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Route } from './Route';

@Entity({ name: 'точки_маршрутів' })
@Unique('точки_маршрутів_маршрут_id_довго_key', ['route', 'longitude', 'latitude'])
@Unique('точки_маршрутів_попередня_точка_key', ['previousPoint'])
@Unique('точки_маршрутів_наступна_точка_i_key', ['nextPoint'])
export class RoutePoint {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Route, (route) => route.routePoints, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'маршрут_id' })
  route: Route;

  @Column({ name: 'довгота', type: 'numeric', precision: 10, scale: 7 })
  longitude: string;

  @Column({ name: 'широта', type: 'numeric', precision: 10, scale: 7 })
  latitude: string;

  @ManyToOne(() => RoutePoint, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'попередня_точка_id' })
  previousPoint?: RoutePoint | null;

  @OneToMany(() => RoutePoint, (child) => child.previousPoint)
  nextChain: RoutePoint[];

  @ManyToOne(() => RoutePoint, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'наступна_точка_id' })
  nextPoint?: RoutePoint | null;

  @OneToMany(() => RoutePoint, (child) => child.nextPoint)
  previousChain: RoutePoint[];
}

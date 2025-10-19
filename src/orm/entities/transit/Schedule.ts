import { Check, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Route } from './Route';
222;
@Entity({ name: 'розклади' })
@Unique('розклади_маршрут_id_key', ['route'])
@Check(`"інтервал_хв" > 0`)
export class Schedule {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @OneToOne(() => Route, (route) => route.schedule)
  @JoinColumn({ name: 'маршрут_id' })
  route: Route;

  @Column({ name: 'час_початку_роботи', type: 'time without time zone' })
  startTime: string;

  @Column({ name: 'час_кінця_роботи', type: 'time without time zone' })
  endTime: string;

  @Column({ name: 'інтервал_хв', type: 'integer' })
  intervalMinutes: number;
}

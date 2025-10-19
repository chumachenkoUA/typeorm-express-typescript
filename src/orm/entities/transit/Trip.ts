import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { ComplaintSuggestion } from './ComplaintSuggestion';
import { Driver } from './Driver';
import { Fine } from './Fine';
import { Route } from './Route';
import { Ticket } from './Ticket';
import { Transport } from './Transport';

@Entity({ name: 'рейси' })
@Unique('рейси_транспорт_id_початок_кінец_key', ['transport', 'startedAt', 'finishedAt'])
@Check(`"кінець" > "початок"`)
@Check(`"кількість_пасажирів" >= 0`)
export class Trip {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Route, (route) => route.trips)
  @JoinColumn({ name: 'маршрут_id' })
  route: Route;

  @ManyToOne(() => Transport, (transport) => transport.trips)
  @JoinColumn({ name: 'транспорт_id' })
  transport: Transport;

  @ManyToOne(() => Driver, (driver) => driver.trips)
  @JoinColumn({ name: 'водій_id' })
  driver: Driver;

  @Column({ name: 'початок', type: 'timestamp without time zone' })
  startedAt: Date;

  @Column({ name: 'кінець', type: 'timestamp without time zone' })
  finishedAt: Date;

  @Column({ name: 'кількість_пасажирів', type: 'integer', default: 0 })
  passengerCount: number;

  @OneToMany(() => Ticket, (ticket) => ticket.trip)
  tickets: Ticket[];

  @OneToMany(() => ComplaintSuggestion, (complaint) => complaint.trip)
  complaints: ComplaintSuggestion[];

  @OneToMany(() => Fine, (fine) => fine.trip)
  fines: Fine[];
}

import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TransportCard } from './TransportCard';
import { Trip } from './Trip';

@Entity({ name: 'квитки' })
@Check(`"ціна" >= 0`)
export class Ticket {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Trip, (trip) => trip.tickets)
  @JoinColumn({ name: 'рейс_id' })
  trip: Trip;

  @ManyToOne(() => TransportCard, (card) => card.tickets)
  @JoinColumn({ name: 'картка_id' })
  card: TransportCard;

  @Column({ name: 'ціна', type: 'numeric', precision: 12, scale: 2 })
  price: string;

  @Column({ name: 'час_покупки', type: 'timestamp without time zone', default: () => 'now()' })
  purchasedAt: Date;
}

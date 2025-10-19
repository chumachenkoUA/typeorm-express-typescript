import { Check, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CardTopUp } from './CardTopUp';
import { Passenger } from './Passenger';
import { Ticket } from './Ticket';

@Entity({ name: 'транспортні_картки' })
@Unique('транспортні_картки_номер_key', ['number'])
@Unique('транспортні_картки_користувач_id_key', ['owner'])
@Check(`"баланс" >= 0`)
export class TransportCard {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @OneToOne(() => Passenger, (passenger) => passenger.transportCard, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'користувач_id' })
  owner: Passenger;

  @Column({ name: 'баланс', type: 'numeric', precision: 12, scale: 2, default: () => '0' })
  balance: string;

  @Column({ name: 'номер', type: 'text' })
  number: string;

  @OneToMany(() => Ticket, (ticket) => ticket.card)
  tickets: Ticket[];

  @OneToMany(() => CardTopUp, (topUp) => topUp.card)
  topUps: CardTopUp[];
}

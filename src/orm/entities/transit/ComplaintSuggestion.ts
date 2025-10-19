import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ComplaintStatus } from './enums';
import { Passenger } from './Passenger';
import { Trip } from './Trip';

@Entity({ name: 'скарги_пропозиції' })
@Check(`"статус" IN ('Подано','Розглядається','Розглянуто')`)
export class ComplaintSuggestion {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Passenger, (passenger) => passenger.complaints)
  @JoinColumn({ name: 'користувач_id' })
  passenger: Passenger;

  @Column({ name: 'тип', type: 'text' })
  type: string;

  @Column({ name: 'повідомлення', type: 'text' })
  message: string;

  @ManyToOne(() => Trip, (trip) => trip.complaints, { nullable: true })
  @JoinColumn({ name: 'рейс_id' })
  trip?: Trip | null;

  @Column({ name: 'статус', type: 'text' })
  status: ComplaintStatus;
}

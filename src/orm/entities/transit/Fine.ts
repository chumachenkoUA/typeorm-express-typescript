import { Check, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FineStatus } from './enums';
import { FineAppeal } from './FineAppeal';
import { Passenger } from './Passenger';
import { Trip } from './Trip';

@Entity({ name: 'штрафи' })
@Check(`"статус" IN ('В процесі','Оплачено','Відмінено','Просрочено')`)
export class Fine {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Passenger, (passenger) => passenger.fines)
  @JoinColumn({ name: 'користувач_id' })
  passenger: Passenger;

  @Column({ name: 'статус', type: 'text' })
  status: FineStatus;

  @ManyToOne(() => Trip, (trip) => trip.fines)
  @JoinColumn({ name: 'рейс_id' })
  trip: Trip;

  @Column({ name: 'дата', type: 'timestamp without time zone', default: () => 'now()' })
  issuedAt: Date;

  @OneToOne(() => FineAppeal, (appeal) => appeal.fine)
  appeal: FineAppeal;
}

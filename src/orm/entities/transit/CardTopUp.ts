import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TransportCard } from './TransportCard';

@Entity({ name: 'поповнення_карток' })
@Check(`"сума" > 0`)
export class CardTopUp {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => TransportCard, (card) => card.topUps)
  @JoinColumn({ name: 'картка_id' })
  card: TransportCard;

  @Column({ name: 'сума', type: 'numeric', precision: 12, scale: 2 })
  amount: string;

  @Column({ name: 'час_поповнення', type: 'timestamp without time zone', default: () => 'now()' })
  toppedUpAt: Date;
}

import { Check, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { FineAppealStatus } from './enums';
import { Fine } from './Fine';

@Entity({ name: 'оскарження_штрафів' })
@Unique('оскарження_штрафів_штраф_id_key', ['fine'])
@Check(`"статус" IN ('Подано','Перевіряється','Відхилено','Прийнято')`)
export class FineAppeal {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @OneToOne(() => Fine, (fine) => fine.appeal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'штраф_id' })
  fine: Fine;

  @Column({ name: 'повідомлення', type: 'text' })
  message: string;

  @Column({ name: 'статус', type: 'text' })
  status: FineAppealStatus;

  @Column({ name: 'дата', type: 'timestamp without time zone', default: () => 'now()' })
  submittedAt: Date;
}

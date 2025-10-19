import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { ComplaintSuggestion } from './ComplaintSuggestion';
import { Fine } from './Fine';
import { TransportCard } from './TransportCard';
import { UserGpsLog } from './UserGpsLog';

@Entity({ name: 'користувачі' })
@Unique('користувачі_email_key', ['email'])
@Unique('користувачі_телефон_key', ['phone'])
export class Passenger {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'email', type: 'text' })
  email: string;

  @Column({ name: 'телефон', type: 'text' })
  phone: string;

  @Column({ name: 'піб', type: 'text' })
  fullName: string;

  @CreateDateColumn({ name: 'дата_реєстрації', type: 'timestamp without time zone', default: () => 'now()' })
  registeredAt: Date;

  @OneToOne(() => TransportCard, (card) => card.owner)
  transportCard: TransportCard;

  @OneToMany(() => UserGpsLog, (log) => log.passenger)
  gpsLogs: UserGpsLog[];

  @OneToMany(() => ComplaintSuggestion, (complaint) => complaint.passenger)
  complaints: ComplaintSuggestion[];

  @OneToMany(() => Fine, (fine) => fine.passenger)
  fines: Fine[];
}

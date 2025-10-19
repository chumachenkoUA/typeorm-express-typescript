import { Schedule } from 'orm/entities/transit';

export class ScheduleResponseDto {
  id: string;
  routeId: string | null;
  startTime: string;
  endTime: string;
  intervalMinutes: number;

  constructor(entity: Schedule) {
    this.id = entity.id;
    this.routeId = entity.route?.id ?? null;
    this.startTime = entity.startTime;
    this.endTime = entity.endTime;
    this.intervalMinutes = entity.intervalMinutes;
  }
}

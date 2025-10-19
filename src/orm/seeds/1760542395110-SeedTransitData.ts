import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { CardTopUp } from '../entities/transit/CardTopUp';
import { ComplaintSuggestion } from '../entities/transit/ComplaintSuggestion';
import { Driver } from '../entities/transit/Driver';
import { DriverAssignment } from '../entities/transit/DriverAssignment';
import { ComplaintStatus, FineAppealStatus, FineStatus, RouteDirection } from '../entities/transit/enums';
import { Fine } from '../entities/transit/Fine';
import { FineAppeal } from '../entities/transit/FineAppeal';
import { Passenger } from '../entities/transit/Passenger';
import { Route } from '../entities/transit/Route';
import { RoutePoint } from '../entities/transit/RoutePoint';
import { RouteStop } from '../entities/transit/RouteStop';
import { Schedule } from '../entities/transit/Schedule';
import { Stop } from '../entities/transit/Stop';
import { Ticket } from '../entities/transit/Ticket';
import { Transport } from '../entities/transit/Transport';
import { TransportCard } from '../entities/transit/TransportCard';
import { TransportType } from '../entities/transit/TransportType';
import { Trip } from '../entities/transit/Trip';
import { UserGpsLog } from '../entities/transit/UserGpsLog';
import { VehicleGpsLog } from '../entities/transit/VehicleGpsLog';

export class SeedTransitData1760542395110 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    const transportTypeRepository = getRepository(TransportType);
    const stopRepository = getRepository(Stop);
    const passengerRepository = getRepository(Passenger);
    const driverRepository = getRepository(Driver);
    const routeRepository = getRepository(Route);
    const routeStopRepository = getRepository(RouteStop);
    const routePointRepository = getRepository(RoutePoint);
    const transportRepository = getRepository(Transport);
    const driverAssignmentRepository = getRepository(DriverAssignment);
    const scheduleRepository = getRepository(Schedule);
    const transportCardRepository = getRepository(TransportCard);
    const cardTopUpRepository = getRepository(CardTopUp);
    const tripRepository = getRepository(Trip);
    const ticketRepository = getRepository(Ticket);
    const fineRepository = getRepository(Fine);
    const fineAppealRepository = getRepository(FineAppeal);
    const complaintRepository = getRepository(ComplaintSuggestion);
    const userGpsLogRepository = getRepository(UserGpsLog);
    const vehicleGpsLogRepository = getRepository(VehicleGpsLog);

    const [busType, tramType, trolleybusType] = await transportTypeRepository.save(
      transportTypeRepository.create([{ name: 'Автобус' }, { name: 'Трамвай' }, { name: 'Тролейбус' }]),
    );

    const stops = await stopRepository.save(
      stopRepository.create([
        { name: 'Центральна площа', longitude: '30.5234567', latitude: '50.4501234' },
        { name: 'Вокзал', longitude: '30.5012345', latitude: '50.4478123' },
        { name: 'Магазин', longitude: '30.5154321', latitude: '50.4487654' },
        { name: 'Університет', longitude: '30.5300000', latitude: '50.4515000' },
        { name: 'Парк', longitude: '30.5350000', latitude: '50.4522000' },
      ]),
    );
    const stopByName = new Map(stops.map((stop) => [stop.name, stop]));

    const passengers = await passengerRepository.save(
      passengerRepository.create([
        { email: 'pupkin@example.com', phone: '+380991112233', fullName: 'Пупкін Василь Олександрович' },
        { email: 'ivanova@example.com', phone: '+380992223344', fullName: 'Іванова Марія Сергіївна' },
        { email: 'bondar@example.com', phone: '+380993334455', fullName: 'Бондар Олег Ігорович' },
        { email: 'shevchenko@example.com', phone: '+380994445566', fullName: 'Шевченко Олена Петрівна' },
      ]),
    );
    const passengerByEmail = new Map(passengers.map((passenger) => [passenger.email, passenger]));

    const drivers = await driverRepository.save(
      driverRepository.create([
        {
          email: 'driver1@example.com',
          phone: '+380971112233',
          fullName: 'Сидоренко Петро Іванович',
          licenseData: 'KP123456',
          passportData: { series: 'AB', number: '123456' },
        },
        {
          email: 'driver2@example.com',
          phone: '+380972223344',
          fullName: 'Коваль Андрій Петрович',
          licenseData: 'KP654321',
          passportData: { series: 'AB', number: '654321' },
        },
        {
          email: 'driver3@example.com',
          phone: '+380973334455',
          fullName: 'Мельник Ігор Васильович',
          licenseData: 'KP777888',
          passportData: { series: 'BC', number: '777888' },
        },
      ]),
    );
    const driverByEmail = new Map(drivers.map((driver) => [driver.email, driver]));

    const [route12, route5] = await routeRepository.save(
      routeRepository.create([
        { transportType: busType, number: '12', direction: RouteDirection.Forward, isActive: true },
        { transportType: trolleybusType, number: '5', direction: RouteDirection.Forward, isActive: true },
      ]),
    );

    const createRouteStopChain = async (route: Route, orderedStops: Stop[]) => {
      const chain: RouteStop[] = [];

      for (let index = 0; index < orderedStops.length; index += 1) {
        const stop = orderedStops[index];
        const routeStop = routeStopRepository.create({
          route,
          stop,
          previousStop: index > 0 ? chain[index - 1] : null,
          nextStop: null,
        });

        const saved = await routeStopRepository.save(routeStop);

        if (index > 0) {
          const previous = chain[index - 1];
          previous.nextStop = saved;
          await routeStopRepository.save(previous);
        }

        chain.push(saved);
      }

      return chain;
    };

    await createRouteStopChain(route12, [
      stopByName.get('Центральна площа')!,
      stopByName.get('Вокзал')!,
      stopByName.get('Магазин')!,
      stopByName.get('Університет')!,
      stopByName.get('Парк')!,
    ]);

    await createRouteStopChain(route5, [
      stopByName.get('Центральна площа')!,
      stopByName.get('Університет')!,
      stopByName.get('Вокзал')!,
    ]);

    const createRoutePointChain = async (route: Route, coordinates: Array<{ longitude: string; latitude: string }>) => {
      const chain: RoutePoint[] = [];

      for (let index = 0; index < coordinates.length; index += 1) {
        const { longitude, latitude } = coordinates[index];
        const routePoint = routePointRepository.create({
          route,
          longitude,
          latitude,
          previousPoint: index > 0 ? chain[index - 1] : null,
          nextPoint: null,
        });

        const saved = await routePointRepository.save(routePoint);

        if (index > 0) {
          const previous = chain[index - 1];
          previous.nextPoint = saved;
          await routePointRepository.save(previous);
        }

        chain.push(saved);
      }

      return chain;
    };

    await createRoutePointChain(route12, [
      { longitude: '30.5234567', latitude: '50.4501234' },
      { longitude: '30.5220000', latitude: '50.4498000' },
      { longitude: '30.5200000', latitude: '50.4490000' },
      { longitude: '30.5180000', latitude: '50.4483000' },
      { longitude: '30.5165000', latitude: '50.4480000' },
      { longitude: '30.5150000', latitude: '50.4477000' },
    ]);

    await createRoutePointChain(route5, [
      { longitude: '30.5234567', latitude: '50.4501234' },
      { longitude: '30.5300000', latitude: '50.4515000' },
      { longitude: '30.5012345', latitude: '50.4478123' },
    ]);

    const transports = await transportRepository.save(
      transportRepository.create([
        { boardNumber: 'AB-001', transportType: busType, capacity: 50, route: route12 },
        { boardNumber: 'AB-002', transportType: busType, capacity: 50, route: route12 },
        { boardNumber: 'TB-101', transportType: trolleybusType, capacity: 80, route: route5 },
      ]),
    );
    const transportByBoardNumber = new Map(transports.map((transport) => [transport.boardNumber, transport]));

    await driverAssignmentRepository.save(
      driverAssignmentRepository.create([
        {
          driver: driverByEmail.get('driver1@example.com')!,
          transport: transportByBoardNumber.get('AB-001')!,
          assignedAt: new Date('2025-06-09T07:30:00Z'),
        },
        {
          driver: driverByEmail.get('driver2@example.com')!,
          transport: transportByBoardNumber.get('AB-002')!,
          assignedAt: new Date('2025-06-09T07:40:00Z'),
        },
        {
          driver: driverByEmail.get('driver3@example.com')!,
          transport: transportByBoardNumber.get('TB-101')!,
          assignedAt: new Date('2025-06-09T08:30:00Z'),
        },
      ]),
    );

    await scheduleRepository.save(
      scheduleRepository.create([
        { route: route12, startTime: '06:00', endTime: '23:00', intervalMinutes: 10 },
        { route: route5, startTime: '06:30', endTime: '22:30', intervalMinutes: 12 },
      ]),
    );

    const transportCards = await transportCardRepository.save(
      transportCardRepository.create([
        { owner: passengerByEmail.get('pupkin@example.com')!, balance: '0', number: 'CARD-0001' },
        { owner: passengerByEmail.get('ivanova@example.com')!, balance: '0', number: 'CARD-0002' },
        { owner: passengerByEmail.get('bondar@example.com')!, balance: '0', number: 'CARD-0003' },
        { owner: passengerByEmail.get('shevchenko@example.com')!, balance: '0', number: 'CARD-0004' },
      ]),
    );
    const cardByNumber = new Map(transportCards.map((card) => [card.number, card]));

    await cardTopUpRepository.save(
      cardTopUpRepository.create([
        { card: cardByNumber.get('CARD-0001')!, amount: '200.00' },
        { card: cardByNumber.get('CARD-0002')!, amount: '150.00' },
        { card: cardByNumber.get('CARD-0003')!, amount: '100.00' },
        { card: cardByNumber.get('CARD-0004')!, amount: '50.00' },
      ]),
    );

    const trips = await tripRepository.save(
      tripRepository.create([
        {
          route: route12,
          transport: transportByBoardNumber.get('AB-001')!,
          driver: driverByEmail.get('driver1@example.com')!,
          startedAt: new Date('2025-06-09T08:00:00Z'),
          finishedAt: new Date('2025-06-09T08:40:00Z'),
        },
        {
          route: route12,
          transport: transportByBoardNumber.get('AB-002')!,
          driver: driverByEmail.get('driver2@example.com')!,
          startedAt: new Date('2025-06-09T09:00:00Z'),
          finishedAt: new Date('2025-06-09T09:40:00Z'),
        },
        {
          route: route5,
          transport: transportByBoardNumber.get('TB-101')!,
          driver: driverByEmail.get('driver3@example.com')!,
          startedAt: new Date('2025-06-09T10:00:00Z'),
          finishedAt: new Date('2025-06-09T10:30:00Z'),
        },
      ]),
    );

    await ticketRepository.save(
      ticketRepository.create([
        { trip: trips[0], card: cardByNumber.get('CARD-0001')!, price: '15.00' },
        { trip: trips[1], card: cardByNumber.get('CARD-0002')!, price: '15.00' },
        { trip: trips[1], card: cardByNumber.get('CARD-0003')!, price: '15.00' },
        { trip: trips[2], card: cardByNumber.get('CARD-0004')!, price: '20.00' },
      ]),
    );

    const fines = await fineRepository.save(
      fineRepository.create([
        {
          passenger: passengerByEmail.get('ivanova@example.com')!,
          status: FineStatus.InProgress,
          trip: trips[0],
          issuedAt: new Date('2025-06-09T08:30:00Z'),
        },
        {
          passenger: passengerByEmail.get('bondar@example.com')!,
          status: FineStatus.Paid,
          trip: trips[1],
          issuedAt: new Date('2025-06-09T09:20:00Z'),
        },
      ]),
    );

    await fineAppealRepository.save(
      fineAppealRepository.create([
        {
          fine: fines[0],
          message: 'Прошу скасувати штраф — купон був!',
          status: FineAppealStatus.Submitted,
          submittedAt: new Date('2025-06-09T09:00:00Z'),
        },
        {
          fine: fines[1],
          message: 'Штраф сплачено помилково, прошу повернення',
          status: FineAppealStatus.Submitted,
          submittedAt: new Date('2025-06-09T10:00:00Z'),
        },
      ]),
    );

    await complaintRepository.save(
      complaintRepository.create([
        {
          passenger: passengerByEmail.get('pupkin@example.com')!,
          type: 'Пропозиція',
          message: 'Будь ласка, додайте кондиціонер у салоні',
          trip: trips[0],
          status: ComplaintStatus.Submitted,
        },
        {
          passenger: passengerByEmail.get('shevchenko@example.com')!,
          type: 'Скарга',
          message: 'Довго чекала на зупинці Парк',
          trip: trips[2],
          status: ComplaintStatus.Submitted,
        },
      ]),
    );

    await userGpsLogRepository.save(
      userGpsLogRepository.create([
        {
          passenger: passengerByEmail.get('pupkin@example.com')!,
          longitude: '30.5240000',
          latitude: '50.4500000',
        },
        {
          passenger: passengerByEmail.get('ivanova@example.com')!,
          longitude: '30.5200000',
          latitude: '50.4490000',
        },
      ]),
    );

    await vehicleGpsLogRepository.save(
      vehicleGpsLogRepository.create([
        {
          transport: transportByBoardNumber.get('AB-001')!,
          longitude: '30.5280000',
          latitude: '50.4510000',
        },
      ]),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "логи_gps_транспорту" WHERE "транспорт_id" IN (SELECT id FROM "транспорти" WHERE "бортовий_номер" IN ('AB-001','AB-002','TB-101'))`,
    );
    await queryRunner.query(
      `DELETE FROM "логи_gps_користувачів" WHERE "користувач_id" IN (SELECT id FROM "користувачі" WHERE "email" IN ('pupkin@example.com','ivanova@example.com','bondar@example.com','shevchenko@example.com'))`,
    );
    await queryRunner.query(
      `DELETE FROM "скарги_пропозиції" WHERE "повідомлення" IN ('Будь ласка, додайте кондиціонер у салоні','Довго чекала на зупинці Парк')`,
    );
    await queryRunner.query(
      `DELETE FROM "оскарження_штрафів" WHERE "повідомлення" IN ('Прошу скасувати штраф — купон був!','Штраф сплачено помилково, прошу повернення')`,
    );
    await queryRunner.query(
      `DELETE FROM "штрафи" WHERE "рейс_id" IN (SELECT id FROM "рейси" WHERE "транспорт_id" IN (SELECT id FROM "транспорти" WHERE "бортовий_номер" IN ('AB-001','AB-002','TB-101'))) AND "користувач_id" IN (SELECT id FROM "користувачі" WHERE "email" IN ('ivanova@example.com','bondar@example.com'))`,
    );
    await queryRunner.query(
      `DELETE FROM "квитки" WHERE "рейс_id" IN (SELECT id FROM "рейси" WHERE "транспорт_id" IN (SELECT id FROM "транспорти" WHERE "бортовий_номер" IN ('AB-001','AB-002','TB-101')))`,
    );
    await queryRunner.query(
      `DELETE FROM "рейси" WHERE "транспорт_id" IN (SELECT id FROM "транспорти" WHERE "бортовий_номер" IN ('AB-001','AB-002','TB-101'))`,
    );
    await queryRunner.query(
      `DELETE FROM "поповнення_карток" WHERE "картка_id" IN (SELECT id FROM "транспортні_картки" WHERE "номер" IN ('CARD-0001','CARD-0002','CARD-0003','CARD-0004'))`,
    );
    await queryRunner.query(
      `DELETE FROM "транспортні_картки" WHERE "номер" IN ('CARD-0001','CARD-0002','CARD-0003','CARD-0004')`,
    );
    await queryRunner.query(
      `DELETE FROM "розклади" WHERE "маршрут_id" IN (SELECT id FROM "маршрути" WHERE "номер" IN ('12','5'))`,
    );
    await queryRunner.query(
      `DELETE FROM "призначення_водіїв_транспорту" WHERE "водій_id" IN (SELECT id FROM "водії" WHERE "email" IN ('driver1@example.com','driver2@example.com','driver3@example.com'))`,
    );
    await queryRunner.query(`DELETE FROM "транспорти" WHERE "бортовий_номер" IN ('AB-001','AB-002','TB-101')`);
    await queryRunner.query(
      `DELETE FROM "точки_маршрутів" WHERE "маршрут_id" IN (SELECT id FROM "маршрути" WHERE "номер" IN ('12','5'))`,
    );
    await queryRunner.query(
      `DELETE FROM "зупинки_маршрутів" WHERE "маршрут_id" IN (SELECT id FROM "маршрути" WHERE "номер" IN ('12','5'))`,
    );
    await queryRunner.query(`DELETE FROM "маршрути" WHERE "номер" IN ('12','5')`);
    await queryRunner.query(
      `DELETE FROM "водії" WHERE "email" IN ('driver1@example.com','driver2@example.com','driver3@example.com')`,
    );
    await queryRunner.query(
      `DELETE FROM "користувачі" WHERE "email" IN ('pupkin@example.com','ivanova@example.com','bondar@example.com','shevchenko@example.com')`,
    );
    await queryRunner.query(
      `DELETE FROM "зупинки" WHERE "назва" IN ('Центральна площа','Вокзал','Магазин','Університет','Парк')`,
    );
    await queryRunner.query(`DELETE FROM "типи_транспорту" WHERE "назва" IN ('Автобус','Трамвай','Тролейбус')`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewEntitis1760348623889 implements MigrationInterface {
  name = 'NewEntitis1760348623889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "точки_маршрутів" (
                "id" BIGSERIAL NOT NULL,
                "довгота" numeric(10, 7) NOT NULL,
                "широта" numeric(10, 7) NOT NULL,
                "маршрут_id" bigint,
                "попередня_точка_id" bigint,
                "наступна_точка_id" bigint,
                CONSTRAINT "точки_маршрутів_наступна_точка_i_key" UNIQUE ("наступна_точка_id"),
                CONSTRAINT "точки_маршрутів_попередня_точка_key" UNIQUE ("попередня_точка_id"),
                CONSTRAINT "точки_маршрутів_маршрут_id_довго_key" UNIQUE ("маршрут_id", "довгота", "широта"),
                CONSTRAINT "PK_2b0307001dd7db7853b476a2edf" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "зупинки" (
                "id" BIGSERIAL NOT NULL,
                "назва" text NOT NULL,
                "довгота" numeric(10, 7) NOT NULL,
                "широта" numeric(10, 7) NOT NULL,
                CONSTRAINT "зупинки_назва_довгота_широта_key" UNIQUE ("назва", "довгота", "широта"),
                CONSTRAINT "PK_7de41532b3f212a0a51de4f48e3" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "зупинки_маршрутів" (
                "id" BIGSERIAL NOT NULL,
                "маршрут_id" bigint,
                "зупинка_id" bigint,
                "попередня_зупинка_id" bigint,
                "наступна_зупинка_id" bigint,
                CONSTRAINT "зупинки_маршрут_наступна_зупин_key" UNIQUE ("наступна_зупинка_id"),
                CONSTRAINT "зупинки_маршрут_попередня_зупин_key" UNIQUE ("попередня_зупинка_id"),
                CONSTRAINT "зупинки_маршрут_маршрут_id_зупин_key" UNIQUE ("маршрут_id", "зупинка_id"),
                CONSTRAINT "PK_6588f912f9176fc88c00fe755a6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "розклади" (
                "id" BIGSERIAL NOT NULL,
                "час_початку_роботи" TIME NOT NULL,
                "час_кінця_роботи" TIME NOT NULL,
                "інтервал_хв" integer NOT NULL,
                "маршрут_id" bigint,
                CONSTRAINT "розклади_маршрут_id_key" UNIQUE ("маршрут_id"),
                CONSTRAINT "REL_3cca8bd07607277379f1221f2a" UNIQUE ("маршрут_id"),
                CONSTRAINT "CHK_a099d56f2d6564cd7cee73ac20" CHECK ("інтервал_хв" > 0),
                CONSTRAINT "PK_591b86fff61e40c30c19c823d50" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "типи_транспорту" (
                "id" BIGSERIAL NOT NULL,
                "назва" text NOT NULL,
                CONSTRAINT "типи_транспорту_назва_key" UNIQUE ("назва"),
                CONSTRAINT "PK_df721f7e338162d654283c8abd7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "маршрути" (
                "id" BIGSERIAL NOT NULL,
                "номер" text NOT NULL,
                "напрямок" text NOT NULL,
                "активний" boolean NOT NULL DEFAULT true,
                "тип_транспорту_id" bigint,
                CONSTRAINT "маршрути_тип_транспорту_id_номер__key" UNIQUE ("тип_транспорту_id", "номер", "напрямок"),
                CONSTRAINT "CHK_0730c0c2ccf614bdc0fab97397" CHECK ("напрямок" IN ('прямий', 'зворотній')),
                CONSTRAINT "PK_3ab1390e9412b8260df48ae1f02" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "логи_gps_транспорту" (
                "id" BIGSERIAL NOT NULL,
                "довгота" numeric(10, 7) NOT NULL,
                "широта" numeric(10, 7) NOT NULL,
                "зафіксовано" TIMESTAMP NOT NULL DEFAULT now(),
                "транспорт_id" bigint,
                CONSTRAINT "PK_578a43fa38e29161f9b67e6c5f9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "транспорти" (
                "id" BIGSERIAL NOT NULL,
                "бортовий_номер" text NOT NULL,
                "місткість" integer NOT NULL,
                "тип_транспорту_id" bigint,
                "маршрут_id" bigint,
                CONSTRAINT "транспорти_бортовий_номер_key" UNIQUE ("бортовий_номер"),
                CONSTRAINT "CHK_88f65ea4a7183b505f96d1e7ef" CHECK ("місткість" > 0),
                CONSTRAINT "PK_b6325f18a05a1acdc8867e23e73" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "призначення_водіїв_транспорту" (
                "id" BIGSERIAL NOT NULL,
                "призначено" TIMESTAMP NOT NULL DEFAULT now(),
                "водій_id" bigint,
                "транспорт_id" bigint,
                CONSTRAINT "призначення_вод_водій_id_транспо_key" UNIQUE ("водій_id", "транспорт_id", "призначено"),
                CONSTRAINT "PK_bbac146f57c8f9466ac6d1d7a18" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "водії" (
                "id" BIGSERIAL NOT NULL,
                "email" text NOT NULL,
                "телефон" text NOT NULL,
                "піб" text NOT NULL,
                "дані_водійського_посвідчення" text NOT NULL,
                "паспортні_дані" jsonb NOT NULL,
                CONSTRAINT "водії_дані_водійського_посвідче_key" UNIQUE ("дані_водійського_посвідчення"),
                CONSTRAINT "водії_телефон_key" UNIQUE ("телефон"),
                CONSTRAINT "водії_email_key" UNIQUE ("email"),
                CONSTRAINT "PK_01a6cfc66166eba355552743bf9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "оскарження_штрафів" (
                "id" BIGSERIAL NOT NULL,
                "повідомлення" text NOT NULL,
                "статус" text NOT NULL,
                "дата" TIMESTAMP NOT NULL DEFAULT now(),
                "штраф_id" bigint,
                CONSTRAINT "оскарження_штрафів_штраф_id_key" UNIQUE ("штраф_id"),
                CONSTRAINT "REL_756ea9de78649d91fedf19a76c" UNIQUE ("штраф_id"),
                CONSTRAINT "CHK_18e47582ecf65a4a367c3ceaeb" CHECK (
                    "статус" IN ('Подано', 'Перевіряється', 'Відхилено', 'Прийнято')
                ),
                CONSTRAINT "PK_e43d168ecd1d229eddb2bd6eced" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "штрафи" (
                "id" BIGSERIAL NOT NULL,
                "статус" text NOT NULL,
                "дата" TIMESTAMP NOT NULL DEFAULT now(),
                "користувач_id" bigint,
                "рейс_id" bigint,
                CONSTRAINT "CHK_7c186492e0892b9bc101a584ea" CHECK (
                    "статус" IN ('В процесі', 'Оплачено', 'Відмінено', 'Просрочено')
                ),
                CONSTRAINT "PK_c0d852de38ad27d9a8377f258a8" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "квитки" (
                "id" BIGSERIAL NOT NULL,
                "ціна" numeric(12, 2) NOT NULL,
                "час_покупки" TIMESTAMP NOT NULL DEFAULT now(),
                "рейс_id" bigint,
                "картка_id" bigint,
                CONSTRAINT "CHK_f718f7e5138b7b8073e261bd85" CHECK ("ціна" >= 0),
                CONSTRAINT "PK_0b4b0b9bdba53821f2b2c2e8c20" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "рейси" (
                "id" BIGSERIAL NOT NULL,
                "початок" TIMESTAMP NOT NULL,
                "кінець" TIMESTAMP NOT NULL,
                "кількість_пасажирів" integer NOT NULL DEFAULT '0',
                "маршрут_id" bigint,
                "транспорт_id" bigint,
                "водій_id" bigint,
                CONSTRAINT "рейси_транспорт_id_початок_кінец_key" UNIQUE ("транспорт_id", "початок", "кінець"),
                CONSTRAINT "CHK_3e2f386917869abc0feda5375e" CHECK ("кількість_пасажирів" >= 0),
                CONSTRAINT "CHK_e0c7823a25973375760e7f78f8" CHECK ("кінець" > "початок"),
                CONSTRAINT "PK_dc37aacb9cddd5a5f2376eaa2ad" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "скарги_пропозиції" (
                "id" BIGSERIAL NOT NULL,
                "тип" text NOT NULL,
                "повідомлення" text NOT NULL,
                "статус" text NOT NULL,
                "користувач_id" bigint,
                "рейс_id" bigint,
                CONSTRAINT "CHK_87f46d736b814bc81a62ee784a" CHECK (
                    "статус" IN ('Подано', 'Розглядається', 'Розглянуто')
                ),
                CONSTRAINT "PK_8522d58579262e77e914a04585a" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "логи_gps_користувачів" (
                "id" BIGSERIAL NOT NULL,
                "довгота" numeric(10, 7) NOT NULL,
                "широта" numeric(10, 7) NOT NULL,
                "зафіксовано" TIMESTAMP NOT NULL DEFAULT now(),
                "користувач_id" bigint,
                CONSTRAINT "PK_e86fa6f88468a5247f86079377b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "користувачі" (
                "id" BIGSERIAL NOT NULL,
                "email" text NOT NULL,
                "телефон" text NOT NULL,
                "піб" text NOT NULL,
                "дата_реєстрації" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "користувачі_телефон_key" UNIQUE ("телефон"),
                CONSTRAINT "користувачі_email_key" UNIQUE ("email"),
                CONSTRAINT "PK_4bbadcd1a98a3e824894397a3ab" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "транспортні_картки" (
                "id" BIGSERIAL NOT NULL,
                "баланс" numeric(12, 2) NOT NULL DEFAULT 0,
                "номер" text NOT NULL,
                "користувач_id" bigint,
                CONSTRAINT "транспортні_картки_користувач_id_key" UNIQUE ("користувач_id"),
                CONSTRAINT "транспортні_картки_номер_key" UNIQUE ("номер"),
                CONSTRAINT "REL_6a6930ef16ca6ce1e2ea01ef36" UNIQUE ("користувач_id"),
                CONSTRAINT "CHK_70e9a75850daab98dc76f04079" CHECK ("баланс" >= 0),
                CONSTRAINT "PK_8d0dd235e2fa24644f0f372cc36" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "поповнення_карток" (
                "id" BIGSERIAL NOT NULL,
                "сума" numeric(12, 2) NOT NULL,
                "час_поповнення" TIMESTAMP NOT NULL DEFAULT now(),
                "картка_id" bigint,
                CONSTRAINT "CHK_95ac69d0081a8e71ce9ad6d14c" CHECK ("сума" > 0),
                CONSTRAINT "PK_0d5bb181e7d34c6c78a8168e992" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "точки_маршрутів"
            ADD CONSTRAINT "FK_cf04e01edddf4374259c58cb397" FOREIGN KEY ("маршрут_id") REFERENCES "маршрути"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "точки_маршрутів"
            ADD CONSTRAINT "FK_75f8f0bf3a7522e145d7075cccf" FOREIGN KEY ("попередня_точка_id") REFERENCES "точки_маршрутів"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "точки_маршрутів"
            ADD CONSTRAINT "FK_25f205d932de7e51b69bad37e20" FOREIGN KEY ("наступна_точка_id") REFERENCES "точки_маршрутів"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "зупинки_маршрутів"
            ADD CONSTRAINT "FK_fa6525eca336138c8efde9e8af2" FOREIGN KEY ("маршрут_id") REFERENCES "маршрути"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "зупинки_маршрутів"
            ADD CONSTRAINT "FK_9fe495ae92034d17bd8019848ef" FOREIGN KEY ("зупинка_id") REFERENCES "зупинки"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "зупинки_маршрутів"
            ADD CONSTRAINT "FK_c95d08f7b3a1e15fa4e2f9b4019" FOREIGN KEY ("попередня_зупинка_id") REFERENCES "зупинки_маршрутів"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "зупинки_маршрутів"
            ADD CONSTRAINT "FK_72785892c766abe259cfda43915" FOREIGN KEY ("наступна_зупинка_id") REFERENCES "зупинки_маршрутів"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "розклади"
            ADD CONSTRAINT "FK_3cca8bd07607277379f1221f2a1" FOREIGN KEY ("маршрут_id") REFERENCES "маршрути"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "маршрути"
            ADD CONSTRAINT "FK_0f37caec7d8c33082bfd9172a73" FOREIGN KEY ("тип_транспорту_id") REFERENCES "типи_транспорту"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "логи_gps_транспорту"
            ADD CONSTRAINT "FK_27e277ad1db2d281e115ba5e441" FOREIGN KEY ("транспорт_id") REFERENCES "транспорти"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "транспорти"
            ADD CONSTRAINT "FK_068127280f98e097b005641c1b9" FOREIGN KEY ("тип_транспорту_id") REFERENCES "типи_транспорту"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "транспорти"
            ADD CONSTRAINT "FK_8ecd0dbb0eecc19076a0a771b55" FOREIGN KEY ("маршрут_id") REFERENCES "маршрути"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "призначення_водіїв_транспорту"
            ADD CONSTRAINT "FK_faf4b1fecc12a1ed961bb1bc7fa" FOREIGN KEY ("водій_id") REFERENCES "водії"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "призначення_водіїв_транспорту"
            ADD CONSTRAINT "FK_8eee8cdc8faf62a66e3e56026ad" FOREIGN KEY ("транспорт_id") REFERENCES "транспорти"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "оскарження_штрафів"
            ADD CONSTRAINT "FK_756ea9de78649d91fedf19a76c7" FOREIGN KEY ("штраф_id") REFERENCES "штрафи"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "штрафи"
            ADD CONSTRAINT "FK_ea98ed9fda22eebe74efb682737" FOREIGN KEY ("користувач_id") REFERENCES "користувачі"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "штрафи"
            ADD CONSTRAINT "FK_d35de43c85dbf7abbd323cc97aa" FOREIGN KEY ("рейс_id") REFERENCES "рейси"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "квитки"
            ADD CONSTRAINT "FK_e6a0472464e5e6528dcd38c7459" FOREIGN KEY ("рейс_id") REFERENCES "рейси"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "квитки"
            ADD CONSTRAINT "FK_3799e4a4f726da2428dd6354108" FOREIGN KEY ("картка_id") REFERENCES "транспортні_картки"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "рейси"
            ADD CONSTRAINT "FK_f5da18781c7a40505156d932557" FOREIGN KEY ("маршрут_id") REFERENCES "маршрути"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "рейси"
            ADD CONSTRAINT "FK_a067f1f90580aa8012934bf5564" FOREIGN KEY ("транспорт_id") REFERENCES "транспорти"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "рейси"
            ADD CONSTRAINT "FK_a3a315597c6ce94e0d9ff9b1707" FOREIGN KEY ("водій_id") REFERENCES "водії"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "скарги_пропозиції"
            ADD CONSTRAINT "FK_ea6996b6315db83f49be75648d3" FOREIGN KEY ("користувач_id") REFERENCES "користувачі"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "скарги_пропозиції"
            ADD CONSTRAINT "FK_e238d62929cf8433852f0431d93" FOREIGN KEY ("рейс_id") REFERENCES "рейси"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "логи_gps_користувачів"
            ADD CONSTRAINT "FK_f7fad119ab76169e5592dd3bba6" FOREIGN KEY ("користувач_id") REFERENCES "користувачі"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "транспортні_картки"
            ADD CONSTRAINT "FK_6a6930ef16ca6ce1e2ea01ef36c" FOREIGN KEY ("користувач_id") REFERENCES "користувачі"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "поповнення_карток"
            ADD CONSTRAINT "FK_3fc92f5c49355846ac008e1449b" FOREIGN KEY ("картка_id") REFERENCES "транспортні_картки"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "поповнення_карток" DROP CONSTRAINT "FK_3fc92f5c49355846ac008e1449b"
        `);
    await queryRunner.query(`
            ALTER TABLE "транспортні_картки" DROP CONSTRAINT "FK_6a6930ef16ca6ce1e2ea01ef36c"
        `);
    await queryRunner.query(`
            ALTER TABLE "логи_gps_користувачів" DROP CONSTRAINT "FK_f7fad119ab76169e5592dd3bba6"
        `);
    await queryRunner.query(`
            ALTER TABLE "скарги_пропозиції" DROP CONSTRAINT "FK_e238d62929cf8433852f0431d93"
        `);
    await queryRunner.query(`
            ALTER TABLE "скарги_пропозиції" DROP CONSTRAINT "FK_ea6996b6315db83f49be75648d3"
        `);
    await queryRunner.query(`
            ALTER TABLE "рейси" DROP CONSTRAINT "FK_a3a315597c6ce94e0d9ff9b1707"
        `);
    await queryRunner.query(`
            ALTER TABLE "рейси" DROP CONSTRAINT "FK_a067f1f90580aa8012934bf5564"
        `);
    await queryRunner.query(`
            ALTER TABLE "рейси" DROP CONSTRAINT "FK_f5da18781c7a40505156d932557"
        `);
    await queryRunner.query(`
            ALTER TABLE "квитки" DROP CONSTRAINT "FK_3799e4a4f726da2428dd6354108"
        `);
    await queryRunner.query(`
            ALTER TABLE "квитки" DROP CONSTRAINT "FK_e6a0472464e5e6528dcd38c7459"
        `);
    await queryRunner.query(`
            ALTER TABLE "штрафи" DROP CONSTRAINT "FK_d35de43c85dbf7abbd323cc97aa"
        `);
    await queryRunner.query(`
            ALTER TABLE "штрафи" DROP CONSTRAINT "FK_ea98ed9fda22eebe74efb682737"
        `);
    await queryRunner.query(`
            ALTER TABLE "оскарження_штрафів" DROP CONSTRAINT "FK_756ea9de78649d91fedf19a76c7"
        `);
    await queryRunner.query(`
            ALTER TABLE "призначення_водіїв_транспорту" DROP CONSTRAINT "FK_8eee8cdc8faf62a66e3e56026ad"
        `);
    await queryRunner.query(`
            ALTER TABLE "призначення_водіїв_транспорту" DROP CONSTRAINT "FK_faf4b1fecc12a1ed961bb1bc7fa"
        `);
    await queryRunner.query(`
            ALTER TABLE "транспорти" DROP CONSTRAINT "FK_8ecd0dbb0eecc19076a0a771b55"
        `);
    await queryRunner.query(`
            ALTER TABLE "транспорти" DROP CONSTRAINT "FK_068127280f98e097b005641c1b9"
        `);
    await queryRunner.query(`
            ALTER TABLE "логи_gps_транспорту" DROP CONSTRAINT "FK_27e277ad1db2d281e115ba5e441"
        `);
    await queryRunner.query(`
            ALTER TABLE "маршрути" DROP CONSTRAINT "FK_0f37caec7d8c33082bfd9172a73"
        `);
    await queryRunner.query(`
            ALTER TABLE "розклади" DROP CONSTRAINT "FK_3cca8bd07607277379f1221f2a1"
        `);
    await queryRunner.query(`
            ALTER TABLE "зупинки_маршрутів" DROP CONSTRAINT "FK_72785892c766abe259cfda43915"
        `);
    await queryRunner.query(`
            ALTER TABLE "зупинки_маршрутів" DROP CONSTRAINT "FK_c95d08f7b3a1e15fa4e2f9b4019"
        `);
    await queryRunner.query(`
            ALTER TABLE "зупинки_маршрутів" DROP CONSTRAINT "FK_9fe495ae92034d17bd8019848ef"
        `);
    await queryRunner.query(`
            ALTER TABLE "зупинки_маршрутів" DROP CONSTRAINT "FK_fa6525eca336138c8efde9e8af2"
        `);
    await queryRunner.query(`
            ALTER TABLE "точки_маршрутів" DROP CONSTRAINT "FK_25f205d932de7e51b69bad37e20"
        `);
    await queryRunner.query(`
            ALTER TABLE "точки_маршрутів" DROP CONSTRAINT "FK_75f8f0bf3a7522e145d7075cccf"
        `);
    await queryRunner.query(`
            ALTER TABLE "точки_маршрутів" DROP CONSTRAINT "FK_cf04e01edddf4374259c58cb397"
        `);
    await queryRunner.query(`
            DROP TABLE "поповнення_карток"
        `);
    await queryRunner.query(`
            DROP TABLE "транспортні_картки"
        `);
    await queryRunner.query(`
            DROP TABLE "користувачі"
        `);
    await queryRunner.query(`
            DROP TABLE "логи_gps_користувачів"
        `);
    await queryRunner.query(`
            DROP TABLE "скарги_пропозиції"
        `);
    await queryRunner.query(`
            DROP TABLE "рейси"
        `);
    await queryRunner.query(`
            DROP TABLE "квитки"
        `);
    await queryRunner.query(`
            DROP TABLE "штрафи"
        `);
    await queryRunner.query(`
            DROP TABLE "оскарження_штрафів"
        `);
    await queryRunner.query(`
            DROP TABLE "водії"
        `);
    await queryRunner.query(`
            DROP TABLE "призначення_водіїв_транспорту"
        `);
    await queryRunner.query(`
            DROP TABLE "транспорти"
        `);
    await queryRunner.query(`
            DROP TABLE "логи_gps_транспорту"
        `);
    await queryRunner.query(`
            DROP TABLE "маршрути"
        `);
    await queryRunner.query(`
            DROP TABLE "типи_транспорту"
        `);
    await queryRunner.query(`
            DROP TABLE "розклади"
        `);
    await queryRunner.query(`
            DROP TABLE "зупинки_маршрутів"
        `);
    await queryRunner.query(`
            DROP TABLE "зупинки"
        `);
    await queryRunner.query(`
            DROP TABLE "точки_маршрутів"
        `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class post1659301957619 implements MigrationInterface {
  name = 'post1659301957619';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "track" ADD "favoritesId" uuid`);
    await queryRunner.query(`ALTER TABLE "album" ADD "favoritesId" uuid`);
    await queryRunner.query(`ALTER TABLE "artist" ADD "favoritesId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_c6b015f028051f496021441aa33" FOREIGN KEY ("favoritesId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_044d50da14c9d109cc1ba040a60" FOREIGN KEY ("favoritesId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artist" ADD CONSTRAINT "FK_de2855222b5e4cc3a98d62fdd70" FOREIGN KEY ("favoritesId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artist" DROP CONSTRAINT "FK_de2855222b5e4cc3a98d62fdd70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_044d50da14c9d109cc1ba040a60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_c6b015f028051f496021441aa33"`,
    );
    await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "favoritesId"`);
    await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "favoritesId"`);
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "favoritesId"`);
  }
}

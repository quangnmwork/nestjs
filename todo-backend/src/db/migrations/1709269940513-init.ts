import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1709269940513 implements MigrationInterface {
    name = 'Init1709269940513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sizeOfRoom" integer NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_fc9fe8e7b09bbbeea55ba770e1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roomId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed" FOREIGN KEY ("roomId") REFERENCES "room_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roomId"`);
        await queryRunner.query(`DROP TABLE "room_entity"`);
    }

}

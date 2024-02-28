import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1709106680903 implements MigrationInterface {
    name = 'Init1709106680903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_authenticationtype_enum" AS ENUM('default', 'google')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "authenticationType" "public"."users_authenticationtype_enum" NOT NULL DEFAULT 'default'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "authenticationType"`);
        await queryRunner.query(`DROP TYPE "public"."users_authenticationtype_enum"`);
    }

}

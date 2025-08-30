import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeFullNameNullable1756573976337 implements MigrationInterface {
    name = 'MakeFullNameNullable1756573976337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\` CHANGE \`full_name\` \`full_name\` varchar(100) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\` CHANGE \`full_name\` \`full_name\` varchar(100) NOT NULL
        `);
    }

}

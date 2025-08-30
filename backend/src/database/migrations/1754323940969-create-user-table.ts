import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1754323940969 implements MigrationInterface {
    name = 'CreateUserTable1754323940969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` varchar(36) NOT NULL,
                \`username\` varchar(50) NULL,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`bio\` varchar(255) NOT NULL DEFAULT '',
                \`image\` varchar(255) NOT NULL DEFAULT '',
                \`deleted_at\` timestamp(6) NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`created_by\` varchar(255) NOT NULL,
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`updated_by\` varchar(255) NOT NULL,
                UNIQUE INDEX \`UQ_user_username\` (\`username\`),
                UNIQUE INDEX \`UQ_user_email\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`UQ_user_email\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`UQ_user_username\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    }

}

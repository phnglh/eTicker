import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDobToUser1754324033131 implements MigrationInterface {
  name = 'AddDobToUser1754324033131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`full_name\` varchar(100) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`dob\` date NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`dob\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`full_name\`
        `);
  }
}

import { hashPassword as hashPass } from 'src/utils/password.util';
import { Uuid } from 'src/common/types/common.type';
import { AbstractEntity } from 'src/database/entities/abstract.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends AbstractEntity {
  constructor(data?: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id!: Uuid;

  @Column({
    length: 50,
    nullable: true,
  })
  @Index('UQ_user_username', {
    where: '"deleted_at" IS NULL',
    unique: true,
  })
  username: string;

  @Column()
  @Index('UQ_user_email', { where: '"deleted_at" IS NULL', unique: true })
  email!: string;

  @Column({
    name: 'full_name',
    length: 100,
  })
  fullName: string;

  @Column({
    name: 'dob',
    type: 'date',
    nullable: true,
  })
  dob: Date;

  @Column()
  password!: string;

  @Column({ default: '' })
  bio?: string;

  @Column({ default: '' })
  image?: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPass(this.password);
    }
  }
}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [UserModule, HomeModule],
})
export class ApiModule {}

import { AllConfigType } from '@/config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { UserEntity } from '../user/entities/user.entity';
import { ValidationException } from '@/exceptions/validation.exception';
import { ErrorCode } from '@/constants/error-code.constant';
import { plainToInstance } from 'class-transformer';
import { SYSTEM_USER_ID } from '@/constants/app.constant';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  async register(dto: RegisterReqDto): Promise<RegisterResDto> {
    // check if the user already exists
    const isExistUser = await await UserEntity.exists({
      where: { email: dto.email },
    });

    if (isExistUser) {
      throw new ValidationException(ErrorCode.E003);
    }

    const user = new UserEntity({
      email: dto.email,
      password: dto.password,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    await user.save();

    return plainToInstance(RegisterResDto, {
      userId: user.id,
    });
  }
}

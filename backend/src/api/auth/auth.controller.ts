import { ApiPublic } from '@/decorators/http.decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiPublic()
  @Post('email/register')
  async register(@Body() dto: RegisterReqDto): Promise<RegisterResDto> {
    return await this.authService.register(dto);
  }
}

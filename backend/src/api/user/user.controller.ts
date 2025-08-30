import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { UserResDto } from './dto/user.res.dto';
import { UserService } from './user.service';
import { ApiAuth } from '@/decorators/http.decorators';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @ApiAuth({
  //   type: UserResDto,
  //   summary: 'Create user',
  //   statusCode: HttpStatus.CREATED,
  // })
  async createUser(
    @Body() createUserDto: CreateUserReqDto,
  ): Promise<UserResDto> {
    console.log(createUserDto);
    return await this.userService.create(createUserDto);
  }
}

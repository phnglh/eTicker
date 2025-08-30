import { Public } from 'src/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get()
  @Public()
  home() {
    return {
      message: 'Welcome to the API',
    };
  }
}

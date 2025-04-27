import { Get,
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ResetDto } from './dtos/reset.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../common/get-user.decorator';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }

  @Post('reset')
  reset(@Body() dto: ResetDto) {
    return this.authService.reset(dto);
  }

  @Post('profile-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  uploadProfileImage(
    @GetUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.updateProfileImage(userId, file.filename);
  }


  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@GetUser() user: any) {
    return user;
  }

}
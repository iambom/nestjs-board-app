import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './getUser.decorator';
import { User } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  /** AuthService 를 사용하기 위한 종속성 주입 */
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  authTest(@GetUser() user: User) {
    console.log('user', user);
  }
}

/**
 * AuthGuard()
 * passport 모듈에서 가져옴
 * req 안에 validate 에서 return 해준 user가 들어가게 됨
 * 인증 미들웨어 처리(토큰이 없거나 잘못됐으면 401 에러발생 등)
 */

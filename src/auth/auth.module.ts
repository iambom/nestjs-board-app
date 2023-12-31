import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret1234',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

/**
 * JwtStrategy는 AuthModule 에서 사용하기 위해 providers에 주입하고
 * 다른 모듈에서도 사용할 수 있으므로 exports 에도 넣어줌
 */

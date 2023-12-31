import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  /** AuthService에서 UserRepository 사용할 수 있도록 종속성 주입 */
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret text + Payload 필요)
      const payload = { username };
      const accessToken = this.jwtService.sign(payload); // sign 메소드에서 알아서 secret 과 payload를 합쳐서 accessToken 만들어줌

      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from './entities/auth.entity';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('그런 사람 없음');
    }

    return user;
  }
}

/**
 * @Injectable() 데코레이터 사용
 * JwtStrategy를 다른 곳에서도 사용하기 위해 사용
 *
 * private userRepository
 * 토큰이 유효한지 확인한 후 username으로 user 객체를 가져오려고 useRepository 주입
 *
 * super({secretOrKey, jwtFromRequest})
 * super: 부모 컴포넌트의 것을 사용하기 위해 사용
 * secretOrKey: 토큰이 유효한 지 체크할 때 사용
 * jwtFromRequest: 토큰을 어디서 어떤 걸 가져올 지
 *
 * 토큰이 유효한 지 확인 후 findOne으로 user 정보를 찾음
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  /** AuthService에서 UserRepository 사용할 수 있도록 종속성 주입 */
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
}

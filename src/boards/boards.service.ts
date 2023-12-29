import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  /** board service 에서 repository를 사용할 수 있도록 종속성 주입 */
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}
}

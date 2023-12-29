import { Get, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';

export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
}

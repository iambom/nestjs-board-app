import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

/** /boards 경로로 들어옴 */
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  /** /boards/ 경로 요청에 대한 호출. @Get('/')과 동일 */
  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }
}

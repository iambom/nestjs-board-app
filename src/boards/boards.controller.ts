import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

/** /boards 경로로 들어옴 */
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  /** /boards/ 경로 요청에 대한 호출. @Get('/')과 동일 */
  @Get()
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }
}

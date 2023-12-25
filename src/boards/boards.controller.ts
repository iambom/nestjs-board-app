import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  /** localhost:3001?id=asdf 일 때, @Param() 사용 */
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    return this.boardsService.deleteBoard(id);
  }
}

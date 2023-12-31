import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './board-status.enum';
import { GetUser } from 'src/auth/getUser.decorator';
import { User } from 'src/auth/entities/auth.entity';
@Controller('/boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Board Controller');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creating new board. Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  /** id는 integer여야 하므로 파라미터 레벨에서 파이프 넣어줌 */
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}

/**
 * QueryBuilder
 * nestjs의 repository API 로 웬만한 거 다 되지만 where절 등 복잡하게 사용해야될 때 QueryBuilder 사용
 *
 * pgAdmin 테이블 아래 쿼리에 where 등이 추가된 쿼리 데이터 반환시키나봄
 * SELECT * FROM public.board
 * ORDER BY id ASC
 *
 * query.getMany() <-> getOne()
 * 나오는 데이터 전부 다 가져옴
 *
 */

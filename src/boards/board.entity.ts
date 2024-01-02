import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/entities/auth.entity';

@Entity() // board class가 entity임을 나타냄 (CREATE TABLE board 부분)
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() // board entity의 기본키임을 의미함
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}

/**
 * ORM 없이 기존 데이터베이스 테이블 생성을 아래처럼 해줘야 하는데
 * TypeORM 사용하면 데이터베이스 테이블로 변환되는 class이기 때문에 위처럼 클래스 생성 후 컬럼 정의해주면 됨
 *
 * CREATE TABLE board {
 *  id INTEGER AUTO_INCREMENT PRIMARY KEY
 *  title VARCHAR(255) NOT NULL
 *  description VARCHAR(255) NOT NULL
 * }
 */

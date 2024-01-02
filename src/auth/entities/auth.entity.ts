import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}

/**
 * @Entity() 데코레이터
 * 이 클래스가 entity 클래스인 걸 지정해주는 데코레이터
 *
 * @Unique() 데코레이터
 * username 중복 불가하도록 유니크 데코레이터 적용할 때
 * db에 이미 있는 username 요청 시 500에러 반환
 * (nestjs에서 에러가 발생하고 try catch 구문에서 에러를 잡아주지 않으면 controller 레벨로 가서 500을 던짐
 * 따라서, 원하는 에러 구문을 보여주려면 try catch로 에러 잡아줘야함)
 */

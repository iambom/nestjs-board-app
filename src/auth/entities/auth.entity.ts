import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 이 클래스가 entity 클래스인 걸 지정해주는 데코레이터
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}

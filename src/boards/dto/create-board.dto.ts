/**
 * class는 interface와 달리 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용
 * nestjs 에서는 dto 를 class 로 정의하는 것을 추천
 */

import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

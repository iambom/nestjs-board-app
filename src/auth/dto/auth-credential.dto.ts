import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  /** 영어랑 숫자만 입력 가능하게 하는 정규식 */
  @Matches(/^[a-zA-z0-9]*$/, { message: '영어랑 숫자만 입력하시오' })
  password: string;
}

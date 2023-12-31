import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3001);
}
bootstrap();

/**
 * useGlobalPipes
 * - 전역 파이프를 설정하는 Nestjs의 메서드
 * - 이 메서드는 애플리케이션 전역에서 모든 요청에 대해 파이프를 사용하도록 설정
 *
 * ValidationPipe
 * - 유효성 검사를 해주는 pipe
 *
 * whitelist
 * - 들어오는 데이터에서 유효하지 않은 속성을 자동으로 제거해주는 옵션 (보안상의 이유로 사용 필요)
 *
 * forbidNonWhitelisted
 * - 위 whitelist에서 검증 규칙이 정의되지 않은 props를 발견하면 오류 발생시킴
 * - whitelist가 선행되어야 함
 *
 * transform
 * - 유저가 보낸 것을 원하는 실제 타입으로 변경해줌
 * - string으로 전송된 데이터를 자동으로 number, boolean 등의 타입으로 변환할 수 있도록 함
 */

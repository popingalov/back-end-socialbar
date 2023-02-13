import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export default function errorGenerator(message, status) {
  const sendStatus: any = HttpStatus[`${status}`];
  throw new HttpException(message, sendStatus);
}

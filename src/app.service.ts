import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Welcome to my ToDo-App API',
      status: 'success',
    };
  }
}

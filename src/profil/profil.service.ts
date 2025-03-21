import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users_data } from '../auth/auth.entity';
import { Repository } from 'typeorm';
import { ToDoEntity } from '../todo/todo.entity';

@Injectable()
export class ProfilService {
  constructor(
    @InjectRepository(users_data)
    private readonly users_dataRepository: Repository<users_data>,
  ) {}
  async test(): Promise<object> {
    return { status: 'ok' };
  }

  async profilInfo(userId: string): Promise<object> {
    const user = await this.users_dataRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    return {
      status: 'Success',
      name: user.name,
      email: user.email,
    };
  }

  async deleteAccount(userId: string): Promise<object> {
    await this.users_dataRepository.delete(userId);

    return {
      status: 'Success',
      message: `Deleted user ${userId}`,
    };
  }
}

import { BaseEntity } from 'typeorm';
import { ToDoEntity } from '../todo/todo.entity';
export declare class Auth extends BaseEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    user_number: number;
    todos: ToDoEntity[];
}

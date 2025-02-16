import { BaseEntity } from 'typeorm';
import { Auth } from '../auth/auth.entity';
export declare class ToDoEntity extends BaseEntity {
    id: string;
    todo_title: string;
    todo_description: string;
    todo_active: boolean;
    created_at: Date;
    updated_at: Date;
    completed_at: Date | null;
    todo_number: number;
    author: Auth;
    authorId: string;
}

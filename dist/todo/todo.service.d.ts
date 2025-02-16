import { Repository } from 'typeorm';
import { ToDoEntity } from './todo.entity';
export declare class ToDoService {
    private readonly toDoRepository;
    constructor(toDoRepository: Repository<ToDoEntity>);
    HelloWorld(): string;
    create_ToDo(todo_title: string, todo_description: string, authorId: string): Promise<ToDoEntity>;
    get_ToDo(authorId: string): Promise<ToDoEntity[]>;
}

import { ToDoService } from './todo.service';
import { ToDoEntity } from './todo.entity';
import { Request } from 'express';
export declare class ToDoController {
    private readonly toDoService;
    constructor(toDoService: ToDoService);
    HelloWorld(): string;
    get_ToDo(req: Request): Promise<ToDoEntity[]>;
    create_ToDo(todo_title: string, todo_description: string, req: Request): Promise<ToDoEntity>;
}

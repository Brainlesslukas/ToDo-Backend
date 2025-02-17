import { Auth } from '../auth/auth.entity';
import { Repository } from 'typeorm';
import { ToDoEntity } from '../todo/todo.entity';
import { HttpService } from '@nestjs/axios';
export declare class StatsService {
    private readonly authRepository;
    private readonly toDoEntityRepository;
    private readonly httpService;
    constructor(authRepository: Repository<Auth>, toDoEntityRepository: Repository<ToDoEntity>, httpService: HttpService);
    countUsers(): Promise<number>;
    countTodos(): Promise<number>;
    portainerUptime(): Promise<{
        statusFrontend: string;
        uptime: {
            days: number;
            hours: number;
            minutes: number;
            seconds: number;
        };
        error?: undefined;
        details?: undefined;
    } | {
        statusFrontend: string;
        uptime?: undefined;
        error?: undefined;
        details?: undefined;
    } | {
        error: string;
        details: string;
        statusFrontend?: undefined;
        uptime?: undefined;
    } | {
        error: string;
        statusFrontend?: undefined;
        uptime?: undefined;
        details?: undefined;
    }>;
}

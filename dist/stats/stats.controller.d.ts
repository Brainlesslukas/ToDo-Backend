import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    TestStatsController(): {
        message: string;
    };
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

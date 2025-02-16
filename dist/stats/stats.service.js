"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("../auth/auth.entity");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("../todo/todo.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const process = __importStar(require("node:process"));
let StatsService = class StatsService {
    constructor(authRepository, toDoEntityRepository, httpService) {
        this.authRepository = authRepository;
        this.toDoEntityRepository = toDoEntityRepository;
        this.httpService = httpService;
    }
    async countUsers() {
        return this.authRepository.count();
    }
    async countTodos() {
        return this.toDoEntityRepository.count();
    }
    async portainerUptime() {
        try {
            const Portainer_Secret = process.env.PORTAINER_SECRET;
            const Portainer_Container_ID = process.env.PORTAINER_CONTAINER_ID;
            const portainerResponse = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`https://portainer.brainlesslukas.xyz/api/endpoints/2/docker/containers/${Portainer_Container_ID}/json`, {
                headers: {
                    'x-api-Key': Portainer_Secret,
                    'Content-Type': 'application/json',
                },
            }));
            const state = portainerResponse.data.State;
            const uptimeDate = new Date(portainerResponse.data.State.StartedAt);
            const currentDate = new Date();
            const uptimeMilliseconds = currentDate.getTime() - uptimeDate.getTime();
            const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
            const uptimeMinutes = Math.floor(uptimeSeconds / 60);
            const uptimeHours = Math.floor(uptimeMinutes / 60);
            const uptimeDays = Math.floor(uptimeHours / 24);
            const uptimeFormatted = {
                days: uptimeDays,
                hours: uptimeHours % 24,
                minutes: uptimeMinutes % 60,
                seconds: uptimeSeconds % 60,
            };
            if (state.Running) {
                return { statusFrontend: 'Online', uptime: uptimeFormatted };
            }
            else {
                return { statusFrontend: 'Offline' };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching Portainer uptime:', error.message);
                return { error: 'Failed to fetch uptime', details: error.message };
            }
            else {
                console.error('Unexpected error:', error);
                return { error: 'Unexpected error occurred' };
            }
        }
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __param(1, (0, typeorm_1.InjectRepository)(todo_entity_1.ToDoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService])
], StatsService);
//# sourceMappingURL=stats.service.js.map
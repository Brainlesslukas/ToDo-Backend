"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModule = void 0;
const common_1 = require("@nestjs/common");
const stats_controller_1 = require("./stats.controller");
const stats_service_1 = require("./stats.service");
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("../auth/auth.entity");
const auth_module_1 = require("../auth/auth.module");
const todo_entity_1 = require("../todo/todo.entity");
const todo_module_1 = require("../todo/todo.module");
const axios_1 = require("@nestjs/axios");
console.log('📌 StatsModule wird geladen');
console.log('📌 Auth Entity geladen:', auth_entity_1.Auth);
let StatsModule = class StatsModule {
};
exports.StatsModule = StatsModule;
exports.StatsModule = StatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([auth_entity_1.Auth]),
            typeorm_1.TypeOrmModule.forFeature([todo_entity_1.ToDoEntity]),
            todo_module_1.ToDoModule,
            auth_module_1.AuthModule,
            axios_1.HttpModule
        ],
        controllers: [stats_controller_1.StatsController],
        providers: [stats_service_1.StatsService],
        exports: [stats_service_1.StatsService],
    })
], StatsModule);
//# sourceMappingURL=stats.module.js.map
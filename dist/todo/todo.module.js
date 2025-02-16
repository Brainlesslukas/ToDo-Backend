"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoModule = void 0;
const common_1 = require("@nestjs/common");
const auth_entity_1 = require("../auth/auth.entity");
const typeorm_1 = require("@nestjs/typeorm");
const todo_controller_1 = require("./todo.controller");
const todo_service_1 = require("./todo.service");
const auth_module_1 = require("../auth/auth.module");
const todo_entity_1 = require("./todo.entity");
let ToDoModule = class ToDoModule {
};
exports.ToDoModule = ToDoModule;
exports.ToDoModule = ToDoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([auth_entity_1.Auth]),
            typeorm_1.TypeOrmModule.forFeature([todo_entity_1.ToDoEntity]),
            auth_module_1.AuthModule,
        ],
        controllers: [todo_controller_1.ToDoController],
        providers: [todo_service_1.ToDoService],
        exports: [typeorm_1.TypeOrmModule, todo_service_1.ToDoService],
    })
], ToDoModule);
//# sourceMappingURL=todo.module.js.map
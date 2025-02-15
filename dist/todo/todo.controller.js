"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const todo_service_1 = require("./todo.service");
let ToDoController = class ToDoController {
    constructor(toDoService) {
        this.toDoService = toDoService;
    }
    HelloWorld() {
        return this.toDoService.HelloWorld();
    }
    async get_ToDo(req) {
        const user = req.user;
        if (!user) {
            throw new Error('User is not authenticated');
        }
        const userId = user.id;
        return this.toDoService.get_ToDo(userId);
    }
    async create_ToDo(todo_title, todo_description, req) {
        const user = req.user;
        if (!user) {
            throw new Error('User is not authenticated');
        }
        console.log('Benutzer aus JWT:', user);
        console.log('JWT Payload:', req.user);
        const authorId = user.id;
        return await this.toDoService.create_ToDo(todo_title, todo_description, authorId);
    }
};
exports.ToDoController = ToDoController;
__decorate([
    (0, common_1.Get)('test'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ToDoController.prototype, "HelloWorld", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ToDoController.prototype, "get_ToDo", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)('todo_title')),
    __param(1, (0, common_1.Body)('todo_description')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ToDoController.prototype, "create_ToDo", null);
exports.ToDoController = ToDoController = __decorate([
    (0, common_1.Controller)('todo'),
    __metadata("design:paramtypes", [todo_service_1.ToDoService])
], ToDoController);
//# sourceMappingURL=todo.controller.js.map
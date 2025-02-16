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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const typeorm_1 = require("typeorm");
const todo_entity_1 = require("../todo/todo.entity");
let Auth = class Auth extends typeorm_1.BaseEntity {
};
exports.Auth = Auth;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Auth.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Auth.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Auth.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Auth.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Generated)('increment'),
    __metadata("design:type", Number)
], Auth.prototype, "user_number", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_entity_1.ToDoEntity, (todo) => todo.author),
    __metadata("design:type", Array)
], Auth.prototype, "todos", void 0);
exports.Auth = Auth = __decorate([
    (0, typeorm_1.Entity)('Auth'),
    (0, typeorm_1.Unique)(['email'])
], Auth);
//# sourceMappingURL=auth.entity.js.map
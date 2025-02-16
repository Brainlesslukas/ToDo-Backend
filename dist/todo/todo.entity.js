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
exports.ToDoEntity = void 0;
const typeorm_1 = require("typeorm");
const auth_entity_1 = require("../auth/auth.entity");
let ToDoEntity = class ToDoEntity extends typeorm_1.BaseEntity {
};
exports.ToDoEntity = ToDoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ToDoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], ToDoEntity.prototype, "todo_title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], ToDoEntity.prototype, "todo_description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], ToDoEntity.prototype, "todo_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
    }),
    __metadata("design:type", Date)
], ToDoEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
    }),
    __metadata("design:type", Date)
], ToDoEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ToDoEntity.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Generated)('increment'),
    __metadata("design:type", Number)
], ToDoEntity.prototype, "todo_number", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.Auth, (auth) => auth.todos),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    __metadata("design:type", auth_entity_1.Auth)
], ToDoEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ToDoEntity.prototype, "authorId", void 0);
exports.ToDoEntity = ToDoEntity = __decorate([
    (0, typeorm_1.Entity)('todo_data')
], ToDoEntity);
//# sourceMappingURL=todo.entity.js.map
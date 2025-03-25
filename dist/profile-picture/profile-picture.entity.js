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
exports.profil_picture_data = void 0;
const typeorm_1 = require("typeorm");
const auth_entity_1 = require("../auth/auth.entity");
let profil_picture_data = class profil_picture_data extends typeorm_1.BaseEntity {
};
exports.profil_picture_data = profil_picture_data;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], profil_picture_data.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: 'http://localhost:9000/profile-picture/Default_ProfilePicture.png',
    }),
    __metadata("design:type", String)
], profil_picture_data.prototype, "profilpicture_url", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auth_entity_1.users_data, (user) => user.profilPicture, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", auth_entity_1.users_data)
], profil_picture_data.prototype, "user", void 0);
exports.profil_picture_data = profil_picture_data = __decorate([
    (0, typeorm_1.Entity)('profil_picture_data')
], profil_picture_data);
//# sourceMappingURL=profile-picture.entity.js.map
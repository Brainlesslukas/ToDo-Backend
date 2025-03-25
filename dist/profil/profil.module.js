"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilModule = void 0;
const common_1 = require("@nestjs/common");
const profil_service_1 = require("./profil.service");
const profil_controller_1 = require("./profil.controller");
const auth_entity_1 = require("../auth/auth.entity");
const profile_picture_entity_1 = require("../profile-picture/profile-picture.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ProfilModule = class ProfilModule {
};
exports.ProfilModule = ProfilModule;
exports.ProfilModule = ProfilModule = __decorate([
    (0, common_1.Module)({
        providers: [profil_service_1.ProfilService],
        controllers: [profil_controller_1.ProfilController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([auth_entity_1.users_data]),
            typeorm_1.TypeOrmModule.forFeature([profile_picture_entity_1.profil_picture_data]),
        ],
        exports: [profil_service_1.ProfilService],
    })
], ProfilModule);
//# sourceMappingURL=profil.module.js.map
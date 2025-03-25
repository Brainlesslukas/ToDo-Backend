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
exports.ProfilService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("../auth/auth.entity");
const typeorm_2 = require("typeorm");
let ProfilService = class ProfilService {
    constructor(users_dataRepository) {
        this.users_dataRepository = users_dataRepository;
    }
    async test() {
        return { status: 'ok' };
    }
    async profilInfo(userId) {
        const user = await this.users_dataRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error('User not found!');
        }
        return {
            status: 'Success',
            name: user.name,
            email: user.email,
        };
    }
};
exports.ProfilService = ProfilService;
exports.ProfilService = ProfilService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.users_data)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfilService);
//# sourceMappingURL=profil.service.js.map
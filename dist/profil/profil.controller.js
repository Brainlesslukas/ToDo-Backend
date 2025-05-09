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
exports.ProfilController = void 0;
const common_1 = require("@nestjs/common");
const profil_service_1 = require("./profil.service");
const passport_1 = require("@nestjs/passport");
let ProfilController = class ProfilController {
    constructor(profilService) {
        this.profilService = profilService;
    }
    async profilInfo(req) {
        const user = req.user;
        const userId = user.id;
        return this.profilService.profilInfo(userId);
    }
    async test() {
        return this.profilService.test();
    }
};
exports.ProfilController = ProfilController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfilController.prototype, "profilInfo", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfilController.prototype, "test", null);
exports.ProfilController = ProfilController = __decorate([
    (0, common_1.Controller)('profil'),
    __metadata("design:paramtypes", [profil_service_1.ProfilService])
], ProfilController);
//# sourceMappingURL=profil.controller.js.map
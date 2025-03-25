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
exports.ProfilePictureController = void 0;
const common_1 = require("@nestjs/common");
const profile_picture_service_1 = require("./profile-picture.service");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
let ProfilePictureController = class ProfilePictureController {
    constructor(profilePictureService) {
        this.profilePictureService = profilePictureService;
    }
    async getProfilPicture(req, res) {
        const user = req.user;
        const userId = user.id;
        return await this.profilePictureService.getProfilPicture(userId, res);
    }
    async uploadFile(req, file) {
        console.log('File received:', file);
        if (!file) {
            throw new Error('Keine Datei hochgeladen');
        }
        const user = req.user;
        const userId = user.id;
        return await this.profilePictureService.uploadProfilePicture(file, userId);
    }
};
exports.ProfilePictureController = ProfilePictureController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilePictureController.prototype, "getProfilPicture", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilePictureController.prototype, "uploadFile", null);
exports.ProfilePictureController = ProfilePictureController = __decorate([
    (0, common_1.Controller)('profile-picture'),
    __metadata("design:paramtypes", [profile_picture_service_1.ProfilePictureService])
], ProfilePictureController);
//# sourceMappingURL=profile-picture.controller.js.map
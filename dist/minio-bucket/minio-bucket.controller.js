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
exports.MinioBucketController = void 0;
const common_1 = require("@nestjs/common");
const minio_bucket_service_1 = require("./minio-bucket.service");
const platform_express_1 = require("@nestjs/platform-express");
let MinioBucketController = class MinioBucketController {
    constructor(minioBucketService) {
        this.minioBucketService = minioBucketService;
    }
    async listAllBuckets() {
        return this.minioBucketService.listAllBuckets();
    }
    async uploadFile(file) {
        const result = await this.minioBucketService.uploadFile(file);
        return result;
    }
};
exports.MinioBucketController = MinioBucketController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MinioBucketController.prototype, "listAllBuckets", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MinioBucketController.prototype, "uploadFile", null);
exports.MinioBucketController = MinioBucketController = __decorate([
    (0, common_1.Controller)('minio-bucket'),
    __metadata("design:paramtypes", [minio_bucket_service_1.MinioBucketService])
], MinioBucketController);
//# sourceMappingURL=minio-bucket.controller.js.map
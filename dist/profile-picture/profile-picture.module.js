"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePictureModule = void 0;
const common_1 = require("@nestjs/common");
const profile_picture_service_1 = require("./profile-picture.service");
const profile_picture_controller_1 = require("./profile-picture.controller");
const nestjs_minio_client_1 = require("nestjs-minio-client");
const node_process_1 = __importDefault(require("node:process"));
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("../auth/auth.entity");
const profile_picture_entity_1 = require("./profile-picture.entity");
let ProfilePictureModule = class ProfilePictureModule {
};
exports.ProfilePictureModule = ProfilePictureModule;
exports.ProfilePictureModule = ProfilePictureModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_minio_client_1.MinioModule.register({
                endPoint: node_process_1.default.env.MINIO_ENDPOINT || 'minioToDo',
                port: parseInt(node_process_1.default.env.MINIO_PORT || '9000', 10),
                useSSL: false,
                accessKey: node_process_1.default.env.MINIO_ACCESS_KEY || '',
                secretKey: node_process_1.default.env.MINIO_SECRET_KEY || '',
            }),
            typeorm_1.TypeOrmModule.forFeature([auth_entity_1.users_data]),
            typeorm_1.TypeOrmModule.forFeature([profile_picture_entity_1.profil_picture_data]),
        ],
        providers: [profile_picture_service_1.ProfilePictureService],
        controllers: [profile_picture_controller_1.ProfilePictureController],
        exports: [profile_picture_service_1.ProfilePictureService],
    })
], ProfilePictureModule);
//# sourceMappingURL=profile-picture.module.js.map
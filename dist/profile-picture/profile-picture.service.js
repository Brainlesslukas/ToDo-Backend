"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePictureService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_minio_client_1 = require("nestjs-minio-client");
const path = __importStar(require("path"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_entity_1 = require("../auth/auth.entity");
const profile_picture_entity_1 = require("./profile-picture.entity");
const node_process_1 = __importDefault(require("node:process"));
const url = node_process_1.default.env.MINIO_ENDPOINT;
const port = node_process_1.default.env.MINIO_PORT;
let ProfilePictureService = class ProfilePictureService {
    constructor(minioService, users_dataRepository, profil_picture_dataRepository) {
        this.minioService = minioService;
        this.users_dataRepository = users_dataRepository;
        this.profil_picture_dataRepository = profil_picture_dataRepository;
    }
    async getProfilPicture(userId, res) {
        const user = await this.users_dataRepository.findOne({
            where: { id: userId },
            relations: ['profilPicture'],
        });
        if (!user || !user.profilPicture) {
            throw new common_1.NotFoundException('Profilbild nicht gefunden');
        }
        const filePath = user.profilPicture.profilpicture_url
            .split('/')
            .slice(-1)[0];
        const bucketName = 'profile-picture';
        try {
            const objectStream = await this.minioService.client.getObject(bucketName, filePath);
            res.setHeader('Content-Type', 'image/jpeg');
            objectStream.pipe(res);
        }
        catch (error) {
            console.error('Fehler beim Abrufen des Bildes:', error);
            throw new common_1.NotFoundException('Fehler beim Abrufen des Bildes');
        }
    }
    async uploadProfilePicture(file, userId) {
        console.log('User ID:', userId);
        const bucketName = 'profile-picture';
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const fileDate = `${day}-${month}-${year}`;
        const originalName = file.originalname;
        const extname = path.extname(originalName);
        const fileName = `${userId}_${fileDate}${extname}`;
        const ProfilPictureUrl = `http://localhost:9000/${bucketName}/${fileName}`;
        const user = await this.users_dataRepository.findOne({
            where: { id: userId },
            relations: ['profilPicture'],
        });
        if (!user) {
            throw new Error('User not found');
        }
        const profilePicture = user.profilPicture ||
            this.profil_picture_dataRepository.create({
                user: user,
            });
        profilePicture.profilpicture_url = ProfilPictureUrl;
        await this.profil_picture_dataRepository.save(profilePicture);
        await this.minioService.client.putObject(bucketName, fileName, file.buffer);
        return {
            message: `Die Datei wurde als ${fileName} erfolgreich hochgeladen und gespeichert!`,
            status: 'Success',
            url: `${url}:${port}/${bucketName}/${fileName}`,
        };
    }
};
exports.ProfilePictureService = ProfilePictureService;
exports.ProfilePictureService = ProfilePictureService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(auth_entity_1.users_data)),
    __param(2, (0, typeorm_1.InjectRepository)(profile_picture_entity_1.profil_picture_data)),
    __metadata("design:paramtypes", [nestjs_minio_client_1.MinioService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProfilePictureService);
//# sourceMappingURL=profile-picture.service.js.map
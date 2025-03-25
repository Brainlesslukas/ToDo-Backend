import { MinioService } from 'nestjs-minio-client';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { users_data } from '../auth/auth.entity';
import { profil_picture_data } from './profile-picture.entity';
export declare class ProfilePictureService {
    private readonly minioService;
    private readonly users_dataRepository;
    private readonly profil_picture_dataRepository;
    constructor(minioService: MinioService, users_dataRepository: Repository<users_data>, profil_picture_dataRepository: Repository<profil_picture_data>);
    getProfilPicture(userId: string, res: Response): Promise<void>;
    uploadProfilePicture(file: Express.Multer.File, userId: string): Promise<object>;
}

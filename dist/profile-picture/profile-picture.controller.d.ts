import { ProfilePictureService } from './profile-picture.service';
import { Request, Response } from 'express';
export declare class ProfilePictureController {
    private readonly profilePictureService;
    constructor(profilePictureService: ProfilePictureService);
    getProfilPicture(req: Request, res: Response): Promise<void>;
    uploadFile(req: Request, file: Express.Multer.File): Promise<object>;
}

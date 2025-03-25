import { BaseEntity } from 'typeorm';
import { users_data } from '../auth/auth.entity';
export declare class profil_picture_data extends BaseEntity {
    id: string;
    profilpicture_url: string;
    user: users_data;
}

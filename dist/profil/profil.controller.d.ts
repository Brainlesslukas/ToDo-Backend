import { ProfilService } from './profil.service';
import { Request } from 'express';
export declare class ProfilController {
    private readonly profilService;
    constructor(profilService: ProfilService);
    profilInfo(req: Request): Promise<object>;
    test(): Promise<object>;
}

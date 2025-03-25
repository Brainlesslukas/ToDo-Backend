import { users_data } from '../auth/auth.entity';
import { Repository } from 'typeorm';
export declare class ProfilService {
    private readonly users_dataRepository;
    constructor(users_dataRepository: Repository<users_data>);
    test(): Promise<object>;
    profilInfo(userId: string): Promise<object>;
}

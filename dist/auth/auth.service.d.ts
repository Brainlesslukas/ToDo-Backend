import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    constructor(authRepository: Repository<Auth>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}

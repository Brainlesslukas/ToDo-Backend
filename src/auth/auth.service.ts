import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users_data } from './auth.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { profil_picture_data } from '../profile-picture/profile-picture.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(users_data)
    private readonly users_dataRepository: Repository<users_data>,

    @InjectRepository(profil_picture_data)
    private readonly profil_picture_dataRepository: Repository<profil_picture_data>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultProfilPicture =
      'http://localhost:9000/profile-picture/Default_ProfilePicture.png';

    const profilPicture = this.profil_picture_dataRepository.create({
      profilpicture_url: defaultProfilPicture,
    });

    const user = this.users_dataRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const isEmailAvailable = await this.users_dataRepository.findOne({
      where: { email },
    });

    if (isEmailAvailable) {
      throw new ConflictException('The Email is already used');
    }

    await this.users_dataRepository.save(user);

    profilPicture.user = user;
    await this.profil_picture_dataRepository.save(profilPicture);

    user.profilPicture = profilPicture;
    await this.users_dataRepository.save(user);

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.users_dataRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}

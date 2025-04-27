import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { User } from './user.entity';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ResetDto } from './dtos/reset.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async register(dto: RegisterDto): Promise<{ id: string; username: string }> {
    const { username, password } = dto;
    const existing = await this.userRepo.findOne({ where: { username } });
    if (existing) throw new UnauthorizedException('Username already exists');
    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ username, password: hash });
    await this.userRepo.save(user);
    return { id: user.id, username: user.username };
  }

  async login(dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async refresh(dto: RefreshTokenDto) {
    try {
      const payload = verify(dto.refreshToken, process.env.JWT_REFRESH_SECRET) as any;
      const user = await this.userRepo.findOne({ where: { id: payload.sub } });
      if (!user) throw new UnauthorizedException('Invalid refresh token');
      const newPayload = { sub: user.id, username: user.username };
      const accessToken = sign(newPayload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
      const refreshToken = sign(newPayload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
      return { accessToken, refreshToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async reset(dto: ResetDto): Promise<{ message: string }> {
    const { username, password } = dto;
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await this.userRepo.save(user);
    return { message: 'Password updated successfully' };
  }

  async updateProfileImage(userId: string, filename: string): Promise<{ profileImage: string }> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    user.profileImage = filename;
    await this.userRepo.save(user);
    return { profileImage: filename };
  }

}
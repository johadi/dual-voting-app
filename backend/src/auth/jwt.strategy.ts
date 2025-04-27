import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
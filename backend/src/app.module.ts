import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './static/images' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): TypeOrmModuleOptions => {
        const isDev = cfg.get<string>('NODE_ENV') === 'development';
        return {
          type: isDev ? (cfg.get<string>('DB_TYPE') as any) : 'postgres',
          host: isDev ? cfg.get<string>('DB_HOST') : undefined,
          port: isDev ? +cfg.get<string>('DB_PORT') : undefined,
          username: isDev ? cfg.get<string>('DB_USERNAME') : undefined,
          password: isDev ? cfg.get<string>('DB_PASSWORD') : undefined,
          database: isDev ? cfg.get<string>('DB_NAME') : undefined,
          url: isDev ? undefined : cfg.get<string>('DATABASE_URL'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
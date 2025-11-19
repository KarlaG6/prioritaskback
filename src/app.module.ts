import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { JwtStrategy } from './auth/jwt/jwt.strategy';

@Module({
  imports: [UserModule],
  providers: [JwtStrategy],
})
export class AppModule {}

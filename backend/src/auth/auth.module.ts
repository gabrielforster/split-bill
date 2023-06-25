import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { DatabaseModule } from 'src/database/database.module';
import { BillsModule } from '../bills/bills.module';
import { BillsService } from '../bills/bills.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    BillsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, BillsService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}

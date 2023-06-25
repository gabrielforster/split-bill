import { Module } from '@nestjs/common';
import { BillsService } from '../bills/bills.service';
import { BillsModule } from '../bills/bills.module';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, BillsModule],
  controllers: [UserController],
  providers: [UserService, BillsService],
})
export class UserModule {}

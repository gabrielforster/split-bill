import { Module } from '@nestjs/common';
import { BillsModule } from '../bills/bills.module';
import { DatabaseModule } from '../database/database.module';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [DatabaseModule, BillsModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}

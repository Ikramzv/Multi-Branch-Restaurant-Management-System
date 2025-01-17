import { Module } from '@nestjs/common';
import { BranchesModule } from 'src/branches/branches.module';
import { MenusController } from './menus.controller';
import { MenusRepository } from './menus.repository';
import { MenusService } from './menus.service';

@Module({
  imports: [BranchesModule],
  controllers: [MenusController],
  providers: [MenusService, MenusRepository],
  exports: [MenusService],
})
export class MenusModule {}

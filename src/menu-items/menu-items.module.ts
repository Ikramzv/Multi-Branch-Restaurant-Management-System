import { Module } from "@nestjs/common";
import { MenuItemsController } from "./menu-items.controller";
import { MenuItemsRepository } from "./menu-items.repository";
import { MenuItemsService } from "./menu-items.service";

@Module({
  controllers: [MenuItemsController],
  providers: [MenuItemsService, MenuItemsRepository],
  exports: [MenuItemsService],
})
export class MenuItemsModule {}

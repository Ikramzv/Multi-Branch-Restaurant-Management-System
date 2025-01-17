import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BranchesModule } from './branches/branches.module';
import { PrismaModule } from './common/prisma/prisma.module';
import configuration from './config/config';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { MenusModule } from './menus/menus.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    RestaurantsModule,
    MenusModule,
    BranchesModule,
    MenuItemsModule,
  ],
})
export class AppModule {}

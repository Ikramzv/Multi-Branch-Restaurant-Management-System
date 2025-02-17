import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/common/exceptions/prisma';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemsRepository } from './menu-items.repository';

@Injectable()
export class MenuItemsService {
  constructor(private readonly repository: MenuItemsRepository) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    try {
      return await this.repository.create(createMenuItemDto);
    } catch (error) {
      PrismaErrorHandler.handle(error, 'MenuItem');
    }
  }

  private async findOne(id: string) {
    const menuItem = await this.repository.findOne(id);
    if (!menuItem) {
      throw new NotFoundException(`Menu item not found`);
    }
    return menuItem;
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    await this.findOne(id);
    return this.repository.update(id, updateMenuItemDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repository.remove(id);
  }
}

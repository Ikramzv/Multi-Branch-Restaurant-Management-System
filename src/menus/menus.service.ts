import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenusRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(private readonly repository: MenusRepository) {}

  create(createMenuDto: CreateMenuDto) {
    return this.repository.create(createMenuDto);
  }

  async findOne(id: string) {
    const menu = await this.repository.findOne(id);
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  // async update(id: string, updateMenuDto: UpdateMenuDto) {
  //   await this.findOne(id);
  //   return this.repository.update(id, updateMenuDto);
  // }

  async remove(id: string) {
    await this.findOne(id);
    await this.repository.remove(id);
  }
}

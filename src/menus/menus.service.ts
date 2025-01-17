import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaErrorHandler } from 'src/common/exceptions/prisma';
import { CopyMenuDto } from './dto/copy-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenusRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(private readonly menusRepository: MenusRepository) {}

  create(createMenuDto: CreateMenuDto) {
    return this.menusRepository.create(createMenuDto);
  }

  async copy(copyMenuDto: CopyMenuDto) {
    const include = {
      branch: {
        include: {
          restaurant: true,
        },
      },
    };

    const sourceId = copyMenuDto.sourceMenuId;
    const targetId = copyMenuDto.targetMenuId;

    const [sourceMenu, targetMenu] = await Promise.all([
      this.menusRepository.findOneByFilter({ id: sourceId }, include),
      this.menusRepository.findOneByFilter({ id: targetId }, include),
    ]);

    if (sourceMenu.branch.restaurantId !== targetMenu.branch.restaurantId) {
      throw new BadRequestException(
        'Source and target menus must belong to the same restaurant',
      );
    }

    const hasCircularReference = await this.menusRepository.checkCircularMenu(
      sourceId,
      targetId,
    );

    if (hasCircularReference) {
      throw new BadRequestException(
        'Circular reference detected. Cannot copy menu.',
      );
    }

    try {
      return await this.menusRepository.copyMenuToTarget(
        copyMenuDto.sourceMenuId,
        copyMenuDto.targetMenuId,
      );
    } catch (error) {
      PrismaErrorHandler.handle(error, 'MenuRelation', 'parameters');
    }
  }

  async findOneWithItems(id: string) {
    const menu = await this.menusRepository.findOneWithItems(id);
    if (!menu) {
      throw new NotFoundException(`Menu not found`);
    }

    return menu;
  }

  async findOne(id: string) {
    const menu = await this.menusRepository.findOne(id);
    if (!menu) {
      throw new NotFoundException(`Menu not found`);
    }

    return menu;
  }

  // async update(id: string, updateMenuDto: UpdateMenuDto) {
  //   await this.findOne(id);
  //   return this.repository.update(id, updateMenuDto);
  // }

  async remove(id: string) {
    await this.findOne(id);
    await this.menusRepository.remove(id);
  }
}

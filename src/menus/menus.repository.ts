import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMenuDto) {
    return this.prisma.menu.create({
      data,
      include: {
        branch: true,
        menuItems: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: {
        menuItems: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}

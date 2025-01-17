import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMenuItemDto) {
    const { translations, ...menuItemData } = data;

    return this.prisma.menuItem.create({
      data: {
        ...menuItemData,
        translations: {
          create: translations,
        },
      },
      include: {
        translations: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }

  async update(id: string, data: UpdateMenuItemDto) {
    // split translations and menuItemData from the dto
    const { translations, ...menuItemData } = data;

    return this.prisma.menuItem.update({
      where: { id },
      data: {
        ...menuItemData,
        ...(translations && {
          translations: {
            upsert: translations.map((translation) => ({
              where: {
                // filter by compound unique constraint on menuItemId and locale
                menuItemId_locale: {
                  menuItemId: id,
                  locale: translation.locale,
                },
              },
              // if translation exists, update it
              update: {
                name: translation.name,
              },
              // if translation does not exist, create it
              create: {
                locale: translation.locale,
                name: translation.name,
              },
            })),
          },
        }),
      },
      include: {
        translations: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.menuItem.delete({
      where: { id },
    });
  }
}

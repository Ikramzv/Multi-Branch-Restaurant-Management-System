import { Injectable } from '@nestjs/common';
import { Menu, MenuItem, MenuItemTranslation, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checkCircularMenu(sourceMenuId: string, targetMenuId: string) {
    // Check if adding this relation would create a circular reference
    const rows = await this.prisma.$queryRaw<any[]>`
      WITH RECURSIVE MenuPath AS (
        SELECT 
          targetMenuId,
          sourceMenuId,
          CONCAT(targetMenuId, ',', sourceMenuId) as path
        FROM menu_relations
        WHERE sourceMenuId = ${sourceMenuId}

        UNION ALL

        SELECT
          mr.targetMenuId,
          mr.sourceMenuId,
          CONCAT(path, ",", mr.sourceMenuId) as path
        FROM menu_relations mr
        INNER JOIN MenuPath mp ON mp.sourceMenuId = mr.targetMenuId
        WHERE LOCATE(mr.sourceMenuId, path) >= 0
      )
      
      SELECT * FROM MenuPath
    `;

    return rows.length > 0; // Returns true if circular reference exists
  }

  async create(data: CreateMenuDto) {
    return this.prisma.menu.create({
      data,
      include: {
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
    });
  }

  async findOneWithItems(menuId: string) {
    type MenuWithItems = Menu & {
      menuItems: (MenuItem & {
        translations: MenuItemTranslation[];
      })[];
    };

    const rows = await this.prisma.$queryRaw<MenuWithItems[]>`
      WITH RECURSIVE MenuHierarchy (targetId, parentId) AS (
        -- Get the target menu and its direct parent
        SELECT targetMenuId, sourceMenuId
        FROM menu_relations
        WHERE targetMenuId = ${menuId}

        UNION ALL

        -- Get parent's parents recursively
        SELECT mr.targetMenuId, mr.sourceMenuId
        FROM menu_relations mr
        INNER JOIN MenuHierarchy h ON mr.targetMenuId = h.parentId
      ),
      MenuItemsWithTranslations AS (
        -- Get menu items from the menu and all its parents
        SELECT DISTINCT
          mi.id,
          mi.price,
          mi.menuId,
          mi.createdAt,
          mi.updatedAt,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', mit.id,
              'name', mit.name,
              'locale', mit.locale,
              'menuItemId', mit.menuItemId,
              'createdAt', DATE_FORMAT(mit.createdAt, '%Y-%m-%dT%T.%fZ'),
              'updatedAt', DATE_FORMAT(mit.updatedAt, '%Y-%m-%dT%T.%fZ')
            )
          ) as translations
        FROM menu_items mi
        LEFT JOIN menu_item_translations mit ON mit.menuItemId = mi.id
        WHERE mi.menuId = ${menuId} OR mi.menuId IN (SELECT parentId FROM MenuHierarchy)
        GROUP BY mi.id, mi.price, mi.menuId, mi.createdAt, mi.updatedAt
      )

      -- Final select combining menu with its items
      SELECT 
        m.id,
        m.branchId,
        DATE_FORMAT(m.createdAt, '%Y-%m-%dT%T.%fZ') as createdAt,
        DATE_FORMAT(m.updatedAt, '%Y-%m-%dT%T.%fZ') as updatedAt,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', mit.id,
            'price', mit.price,
            'menuId', mit.menuId,
            'createdAt', DATE_FORMAT(mit.createdAt, '%Y-%m-%dT%T.%fZ'),
            'updatedAt', DATE_FORMAT(mit.updatedAt, '%Y-%m-%dT%T.%fZ'),
            'translations', mit.translations
          )
        ) as menuItems
      FROM menus m
      LEFT JOIN MenuItemsWithTranslations mit ON TRUE
      WHERE m.id = ${menuId}
      GROUP BY m.id, m.branchId, m.createdAt, m.updatedAt;
    `;

    if (!rows.length) return null;
    return rows[0];
  }

  async findOneByFilter(
    filter: Prisma.MenuWhereInput,
    include?: Prisma.MenuInclude,
  ) {
    return this.prisma.menu.findFirst({
      where: filter,
      include,
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

  async copyMenuToTarget(sourceMenuId: string, targetMenuId: string) {
    // Copy menu items from source to target
    return await this.prisma.menuRelation.create({
      data: {
        sourceMenuId,
        targetMenuId,
      },
    });
  }
}

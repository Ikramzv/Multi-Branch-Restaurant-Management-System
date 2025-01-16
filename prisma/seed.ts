import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultLocale = 'az';

  // Create a restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Restaurant 1',
      defaultLocale,
      branches: {
        create: {
          name: 'Restaurant 1 Headquarter',
          timezone: 'Asia/Baku',
          isHeadquarter: true,
        },
      },
    },
    include: {
      branches: {
        where: {
          isHeadquarter: true,
        },
      },
    },
  });

  // Create a menu for the restaurant
  const menu = await prisma.menu.create({
    data: {
      branchId: restaurant.branches[0].id,
      menuItems: {
        create: [
          {
            price: 9.99,
            translations: {
              create: [
                {
                  locale: defaultLocale,
                  name: 'Cheeseburger',
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

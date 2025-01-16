import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRestaurantDto) {
    const { timezone, ...restaurantData } = data;

    return this.prisma.restaurant.create({
      data: {
        ...restaurantData,
        branches: {
          create: {
            name: `${data.name} Headquarter`,
            isHeadquarter: true,
            timezone,
          },
        },
      },
      include: {
        branches: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        branches: true,
      },
    });
  }

  async update(id: string, data: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
}

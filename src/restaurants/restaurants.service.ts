import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/common/exceptions/prisma';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsRepository } from './restaurants.repository';

@Injectable()
export class RestaurantsService {
  constructor(private readonly repository: RestaurantsRepository) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      return await this.repository.create(createRestaurantDto);
    } catch (error) {
      PrismaErrorHandler.handle(error, 'Restaurant');
    }
  }

  async findOne(id: string) {
    const restaurant = await this.repository.findOne(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateRestaurantDto);
    } catch (error) {
      PrismaErrorHandler.handle(error, 'Restaurant');
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repository.remove(id);
  }
}

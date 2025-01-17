import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/common/exceptions/prisma';
import { BranchesRepository } from './branches.repository';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly repository: BranchesRepository) {}

  async create(createBranchDto: CreateBranchDto) {
    try {
      return await this.repository.create(createBranchDto);
    } catch (error) {
      PrismaErrorHandler.handle(error, 'Branch', 'name');
    }
  }

  async findOne(id: string) {
    const branch = await this.repository.findOne(id);
    if (!branch) {
      throw new NotFoundException(`Branch not found`);
    }

    return branch;
  }

  async findRestaurantHQ(restaurantId: string) {
    const branch = await this.repository.findOneByFilter({
      restaurantId,
      isHeadquarter: true,
    });

    if (!branch) {
      throw new NotFoundException(
        `Branch with restaurant ID ${restaurantId} not found`,
      );
    }
    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateBranchDto);
    } catch (error) {
      PrismaErrorHandler.handle(error, 'Branch', 'name');
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repository.remove(id);
  }
}

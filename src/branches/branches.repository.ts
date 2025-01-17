import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBranchDto) {
    return this.prisma.branch.create({
      data,
    });
  }

  async findOne(id: string) {
    return this.prisma.branch.findUnique({
      where: { id },
      include: {
        menus: true,
      },
    });
  }

  async findOneByFilter(
    filter: Prisma.BranchWhereInput,
    include?: Prisma.BranchInclude,
  ) {
    return this.prisma.branch.findFirst({
      where: filter,
      include,
    });
  }

  async update(id: string, data: UpdateBranchDto) {
    return this.prisma.branch.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.branch.delete({
      where: { id },
    });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { TimezoneConversion } from 'src/common/decorators/timezone-conversion.decorator';
import { BranchesService } from './branches.service';
import { BranchResponseDto } from './dto/branch.response.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch' })
  @ApiResponse({
    status: 201,
    description: 'Branch successfully created',
    type: OmitType(BranchResponseDto, ['menus']),
  })
  @TimezoneConversion('timezone')
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a branch by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the branch',
    type: BranchResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Branch not found' })
  @TimezoneConversion('timezone')
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a branch' })
  @ApiResponse({
    status: 200,
    description: 'Branch successfully updated',
    type: OmitType(BranchResponseDto, ['menus']),
  })
  @ApiResponse({ status: 404, description: 'Branch not found' })
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(id, updateBranchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a branch' })
  @ApiResponse({ status: 200, description: 'Branch successfully deleted' })
  @ApiResponse({ status: 404, description: 'Branch not found' })
  remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }
}

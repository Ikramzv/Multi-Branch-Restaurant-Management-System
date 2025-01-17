import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BranchesService } from 'src/branches/branches.service';
import { TimezoneConversion } from 'src/common/decorators/timezone-conversion.decorator';
import { CopyMenuDto } from './dto/copy-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuResponseDto } from './dto/menu.response.dto';
import { MenusService } from './menus.service';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(
    private readonly menusService: MenusService,
    private readonly branchesService: BranchesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({
    status: 201,
    description: 'Menu successfully created',
    type: MenuResponseDto,
  })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the menu',
    type: MenuResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  @TimezoneConversion('timezone')
  async findOne(@Param('id') id: string) {
    const menu = await this.menusService.findOneWithItems(id);
    const branch = await this.branchesService.findOne(menu.branchId);

    return {
      ...menu,
      timezone: branch.timezone,
    };
  }

  @Post('copy')
  @ApiOperation({ summary: 'Copy a menu' })
  @ApiResponse({
    status: 200,
    description: 'Menu successfully copied',
  })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  copy(@Body() copyMenuDto: CopyMenuDto) {
    return this.menusService.copy(copyMenuDto);
  }

  // @Patch(":id")
  // @ApiOperation({ summary: "Update a menu" })
  // @ApiResponse({
  //   status: 200,
  //   description: "Menu successfully updated",
  //   type: MenuResponseDto,
  // })
  // @ApiResponse({ status: 404, description: "Menu not found" })
  // update(@Param("id") id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menusService.update(id, updateMenuDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu' })
  @ApiResponse({ status: 200, description: 'Menu successfully deleted' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}

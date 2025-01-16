import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuResponseDto } from './dto/menu.response.dto';
import { MenusService } from './menus.service';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

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
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
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

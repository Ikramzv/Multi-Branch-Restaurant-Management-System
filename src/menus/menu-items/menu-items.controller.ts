import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { MenuItemResponseDto } from "./dto/menu-item.response.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";
import { MenuItemsService } from "./menu-items.service";

@ApiTags("Menu Items")
@Controller("menu-items")
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new menu item" })
  @ApiResponse({
    status: 201,
    description: "Menu item successfully created",
    type: MenuItemResponseDto,
  })
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a menu item by id" })
  @ApiResponse({
    status: 200,
    description: "Return the menu item",
    type: MenuItemResponseDto,
  })
  @ApiResponse({ status: 404, description: "Menu item not found" })
  findOne(@Param("id") id: string) {
    return this.menuItemsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a menu item" })
  @ApiResponse({
    status: 200,
    description: "Menu item successfully updated",
    type: MenuItemResponseDto,
  })
  @ApiResponse({ status: 404, description: "Menu item not found" })
  update(
    @Param("id") id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto
  ) {
    return this.menuItemsService.update(id, updateMenuItemDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a menu item" })
  @ApiResponse({ status: 200, description: "Menu item successfully deleted" })
  @ApiResponse({ status: 404, description: "Menu item not found" })
  remove(@Param("id") id: string) {
    return this.menuItemsService.remove(id);
  }
}

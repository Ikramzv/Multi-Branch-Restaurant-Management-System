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
import { BranchesService } from 'src/branches/branches.service';
import { TimezoneConversion } from 'src/common/decorators/timezone-conversion.decorator';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantResponseDto } from './dto/restaurant.response.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly branchesService: BranchesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({
    status: 201,
    description: 'Restaurant successfully created',
    type: RestaurantResponseDto,
  })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a restaurant by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the restaurant',
    type: RestaurantResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  @TimezoneConversion('timezone')
  async findOne(@Param('id') id: string) {
    const restaurant = await this.restaurantsService.findOne(id);
    const branch = await this.branchesService.findRestaurantHQ(restaurant.id);

    return {
      ...restaurant,
      timezone: branch.timezone,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a restaurant' })
  @ApiResponse({
    status: 200,
    type: [OmitType(RestaurantResponseDto, ['branches'])],
    description: 'Restaurant successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant' })
  @ApiResponse({ status: 200, description: 'Restaurant successfully deleted' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}

import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends OmitType(PartialType(CreateMenuDto), [
  'branchId',
]) {}

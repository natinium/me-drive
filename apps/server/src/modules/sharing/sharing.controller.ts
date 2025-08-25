import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SharingService } from './sharing.service';
import { CreateShareDto } from './dto/create-sharing.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('sharing')
@Controller('sharing')
export class SharingController {
  constructor(private readonly sharingService: SharingService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShareDto: CreateShareDto, @Req() req) {
    return this.sharingService.create(createShareDto, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharingService.findOne(id);
  }
}

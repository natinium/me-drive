// src/folders/folders.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // FIX: Corrected relative import path
import { Request } from 'express';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard) // This will now work correctly
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto, @Req() req: Request) {
    const user = req.user as User;
    // FIX: Passing the ownerId to the service call
    return this.foldersService.create(createFolderDto, user.id);
  }

  @Get()
  findAll(@Req() req: Request, @Query('parentId') parentId?: string) {
    const user = req.user as User;
    // FIX: Passing the ownerId to the service call
    return this.foldersService.findAll(user.id, parentId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    // FIX: Passing the ownerId to the service call
    return this.foldersService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFolderDto: UpdateFolderDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    // FIX: Passing the ownerId to the service call
    return this.foldersService.update(id, updateFolderDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    // FIX: Passing the ownerId to the service call
    return this.foldersService.remove(id, user.id);
  }
}

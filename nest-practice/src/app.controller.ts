import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAlbumDto } from 'dto/create-album.dto';
import { Album } from 'entities/album.entity';
import { AppService } from './app.service';

@ApiTags('albums')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ type: Album, isArray: true })
  @Get(':id')
  findOne(@Param('id') id: string): Album {
    return this.appService.findOne(Number(id));
  }

  @ApiNoContentResponse({ type: Album })
  @ApiBadGatewayResponse()
  @ApiResponse({ status: 201, description: 'The record was created' })
  @HttpCode(204)
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.artist) {
      throw new BadRequestException();
    }
    return this.appService.create(createAlbumDto);
  }

  @Get('')
  findAll(): Album[] {
    return this.appService.findAll();
  }
}

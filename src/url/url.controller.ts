import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Res,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UrlService } from './url.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { Req } from '@nestjs/common';

@ApiTags('url')
@Controller()
export class UrlController {
  constructor(private readonly service: UrlService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @Post('api/shorten')
  async create(@Body() dto: CreateShortUrlDto, @Req() req: any) {
    const doc = await this.service.shorten(dto, req.user.userId);
    return {
      originalUrl: doc.originalUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/r/${doc.shortCode}`,
    };
  }

  @Get('r/:shortCode')
  @HttpCode(302)
  async redirect(@Param('shortCode') code: string, @Res() res: Response) {
    const doc = await this.service.getByCode(code);
    await this.service.incrementClick(code);
    return res.redirect(doc.originalUrl);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('api/stats/:shortCode')
  async stats(@Param('shortCode') code: string) {
    const doc = await this.service.getByCode(code);
    return {
      originalUrl: doc.originalUrl,
      shortUrl: `/r/${doc.shortCode}`,
      clicks: doc.clicks,
    };
  }
}

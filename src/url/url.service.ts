import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortUrl } from './schemas/url.schema';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(ShortUrl.name) private readonly model: Model<ShortUrl>,
  ) {}

  private async generateUniqueCode(): Promise<string> {
    let code: string;
    do {
      code = randomBytes(4).toString('base64url').slice(0, 8);
    } while (await this.model.exists({ shortCode: code }));
    return code;
  }

  async shorten(dto: CreateShortUrlDto, owner: string) {
    const shortCode = dto.customCode ?? (await this.generateUniqueCode());

    if (await this.model.exists({ shortCode }))
      throw new ConflictException('Shortcode already in use');

    const doc = await this.model.create({
      originalUrl: dto.url,
      shortCode,
      owner,
    });
    return doc;
  }

  async getByCode(code: string) {
    const doc = await this.model.findOne({ shortCode: code });
    if (!doc) throw new NotFoundException('Short URL not found');
    return doc;
  }

  async incrementClick(code: string) {
    return this.model.updateOne({ shortCode: code }, { $inc: { clicks: 1 } });
  }
}

import { IsOptional, IsString, IsUrl, Matches } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateShortUrlDto {
  @ApiProperty() @IsUrl() url: string;

  @ApiPropertyOptional({
    description: 'Custom shortcode (6-30 alnum, dash/underscore)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z0-9_-]{6,30}$/)
  customCode?: string;
}

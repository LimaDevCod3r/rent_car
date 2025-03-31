import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryProvider {
  constructor(configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'rentCars',
        resource_type: 'auto',
      });

      if (!result || !result.secure_url) {
        throw new BadRequestException('Erro ao processar o upload da imagem');
      }

      return result.secure_url;
    } catch (error) {
      throw new BadRequestException(
        'Erro ao fazer upload da imagem para o Cloudinary',
      );
    }
  }
}

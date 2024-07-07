import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductsRepository, ProductsService],
  controllers: [ProductsController],
  imports: [PrismaModule],
  exports: [ProductsService]
})
export class ProductsModule {}

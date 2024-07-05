import { Module } from '@nestjs/common';
import { ProductGroupsService } from './product-groups.service';
import { ProductGroupsController } from './product-groups.controller';
import { ProductGroupsRepository } from './product-groups-repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductGroupsRepository, ProductGroupsService],
  controllers: [ProductGroupsController],
  imports: [PrismaModule],
  exports: [ProductGroupsService]
})
export class ProductGroupsModule {}

import { Module } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { SuppliesController } from './supplies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupplyRepository } from './supplies.repository';

@Module({
	providers: [SupplyRepository, SuppliesService],
	controllers: [SuppliesController],
	imports: [PrismaModule],
	exports: [SuppliesService]
})
export class SuppliesModule {}

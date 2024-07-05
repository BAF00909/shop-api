import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionsService } from './positions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PositionsRepository } from './positions-repository';

@Module({
  controllers: [PositionController],
  providers: [PositionsService, PositionsRepository],
  imports: [PrismaModule],
  exports: [PositionsService]
})
export class PositionsModule {}

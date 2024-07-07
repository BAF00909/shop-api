import { Module } from '@nestjs/common';
import { ReasonReturnService } from './reason-return.service';
import { ReasonReturnController } from './reason-return.controller';
import { ReasonReturnRepository } from './reason-return-repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ReasonReturnRepository, ReasonReturnService],
  controllers: [ReasonReturnController],
  imports: [PrismaModule],
  exports: [ReasonReturnService]
})
export class ReasonReturnModule {}

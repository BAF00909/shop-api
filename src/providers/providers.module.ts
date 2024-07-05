import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { ProvidersRepository } from './providers-repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProvidersRepository, ProvidersService],
  controllers: [ProvidersController],
	exports: [ProvidersService],
	imports: [PrismaModule]
})
export class ProvidersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { ProvidersModule } from './providers/providers.module';
import { PositionsModule } from './positions/positions.module';
import { SuppliesModule } from './supplies/supplies.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductGroupsModule } from './product-groups/product-groups.module';
import { OverdueProductsModule } from './overdue-products/overdue-products.module';
import { SoltProductsModule } from './solt-products/solt-products.module';
import { ReturnedProductsModule } from './returned-products/returned-products.module';
import { ReasonReturnModule } from './reason-return/reason-return.module';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true}),
		ProductsModule,
		EmployeesModule,
		ProvidersModule,
		PositionsModule,
		SuppliesModule,
		PrismaModule,
		ProductGroupsModule,
		OverdueProductsModule,
		SoltProductsModule,
		ReturnedProductsModule,
		ReasonReturnModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

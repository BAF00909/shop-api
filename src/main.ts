import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	const config = new DocumentBuilder()
	.setTitle('Shop-api')
	.setDescription('The shop API')
	.setVersion('0.1')
	.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api',app, document);
	app.enableCors({
		origin: 'http://localhost:3001',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true
	});
	await app.listen(3000);
}
bootstrap();

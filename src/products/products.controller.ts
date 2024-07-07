import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { HttpTransportResult } from 'src/common/httpResult.interface';
import { ProductModel } from './product.model';
import { IPagination } from 'src/common/paggination.interface';
import { ProductCreateDto } from './dto/product-create.dto';

@Controller('products')
export class ProductsController {
	constructor(private readonly service: ProductsService){}

	@HttpCode(200)
	@Get('all')
	async getAll(@Query() params: IPagination): Promise<HttpTransportResult<ProductModel[]>> {
		try {
			const result = await this.service.getAllProducts(params);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}

	@HttpCode(200)
	@Get(':id')
	async getById(@Param('id') id: string): Promise<HttpTransportResult<ProductModel>> {
		try {
			const result = await this.service.getProductById(Number(id));
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}

	@HttpCode(201)
	@Post()
	async create(@Body() dto: ProductCreateDto): Promise<HttpTransportResult<ProductModel>> {
		try {
			const result = await this.service.createProduct(dto);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}

	@HttpCode(200)
	@Put()
	async update(@Body() product: ProductModel): Promise<HttpTransportResult<ProductModel>> {
		try {
			const result = await this.service.updateProduct(product);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}

	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<HttpTransportResult<ProductModel>> {
		try {
			const result = await this.service.deleteProduct(Number(id));
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}
}

import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ProductGroupsService } from './product-groups.service';
import { HttpTransportResult } from 'src/common/httpResult.interface';
import { ProductGroup } from './product-group.model';
import { IPagination } from 'src/common/paggination.interface';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { PipeTransformId } from 'src/pipes/PipeTransformId';

@Controller('product-groups')
export class ProductGroupsController {
	constructor(private readonly service: ProductGroupsService){}

	@HttpCode(200)
	@Get('all')
	@UsePipes(PipeTransformId)
	async getAll(@Query() params: IPagination): Promise<HttpTransportResult<ProductGroup[]>> {
		try {
			const result = await this.service.getAll(params);
			return ({result});
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
			}
		}
	}

	@HttpCode(200)
	@Get(':id')
	async getById(@Param('id') id: string): Promise<HttpTransportResult<ProductGroup>> {
		try {
			const result = await this.service.getById(Number(id));
			return ({result});
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.NOT_FOUND);
			}
		}
	}

	@HttpCode(201)
	@Post()
	async create(@Body() dto: ProductGroupCreateDto): Promise<HttpTransportResult<ProductGroup>> {
		try {
			const result = await this.service.createProductGroup(dto);
			return ({result});
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@HttpCode(200)
	@Put()
	async update(@Body() productGroup: ProductGroup): Promise<HttpTransportResult<ProductGroup>> {
		try {
			const result = await this.service.updateProductGroup(productGroup);
			return ({result});
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.NOT_FOUND);
			}
		}
	}

	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<HttpTransportResult<ProductGroup>> {
		try {
			const result = await this.service.deleteProductGroup(Number(id));
			return ({result});
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.NOT_FOUND);
			}
		}
	}
}

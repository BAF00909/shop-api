import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { IPagination } from 'src/common/paggination.interface';
import { HttpTransportResult } from 'src/common/httpResult.interface';
import { SupplyModel } from './supply.model';
import { SupplyCreateDto } from './dto/supply-create.dto';

@Controller('supplies')
export class SuppliesController {
	constructor(private readonly service: SuppliesService){}

	@HttpCode(200)
	@Get('all')
	async getAll(@Query() params: IPagination): Promise<HttpTransportResult<SupplyModel[]>> {
		try {
			const result = await this.service.getAllSupplies(params);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@HttpCode(201)
	@Post()
	async create(@Body() dto: SupplyCreateDto): Promise<HttpTransportResult<SupplyModel>> {
		try {
			const result = await this.service.createSupply(dto);
			return ({result});
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@HttpCode(200)
	@Get(':id')
	async getById(@Param('id') id: string): Promise<HttpTransportResult<SupplyModel>> {
		try {
			const result = await this.service.getSupplyById(Number(id));
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@HttpCode(200)
	@Put()
	async updateSupply(@Body() supply: SupplyModel): Promise<HttpTransportResult<SupplyModel>> {
		try {
			const result = await this.service.updateSupply(supply);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@HttpCode(200)
	@Delete(':id')
	async deleteSupply(@Param('id') id: string): Promise<HttpTransportResult<SupplyModel>> {
		try {
			const result = await this.service.deleteSupply(Number(id));
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.NOT_FOUND);
			}
		}
	}
}

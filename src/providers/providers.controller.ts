import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { HttpTransportResult } from 'src/common/httpResult.interface';
import { ProviderModel } from './providerModel';
import { ProvidersService } from './providers.service';
import { IPagination } from 'src/common/paggination.interface';
import { ProviderCreateDto } from './dto/provider-create-dto';

@Controller('providers')
export class ProvidersController {
	constructor(private readonly service: ProvidersService){}
	@HttpCode(200)
	@Get('/all')
	async getProviders(@Query() params: IPagination): Promise<HttpTransportResult<ProviderModel[]>>{
		const result = await this.service.getAll(params);
		return ({result});
	}

	@HttpCode(201)
	@Post()
	async createProvider(@Body() body: ProviderCreateDto): Promise<HttpTransportResult<ProviderModel>> {
		try {
			const result = await this.service.createProvider(body);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@HttpCode(200)
	@Put()
	async update(@Body() provider: ProviderModel): Promise<HttpTransportResult<ProviderModel>> {
		try {
			const result = await this.service.updateProvider(provider);
			return ({result});
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@HttpCode(200)
	@Get(':id')
	async getById(@Param('id') id: string): Promise<HttpTransportResult<ProviderModel>> {
		try {
			const result = await this.service.getById(Number(id));
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.NOT_FOUND);
			}
		}
	}

	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<HttpTransportResult<ProviderModel>> {
		try {
			const result = await this.service.deleteProvider(Number(id));
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.NOT_FOUND);
			}
		}
	}
}

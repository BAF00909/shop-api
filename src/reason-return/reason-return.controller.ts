import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { HttpTransportResult } from 'src/common/httpResult.interface';
import { IPagination } from 'src/common/paggination.interface';
import { ReasonReturnModel } from './reason-return-model';
import { ReasonReturnService } from './reason-return.service';
import { ReasonReturnDto } from './dto/reason-return-create.dto';

@Controller('reason-return')
export class ReasonReturnController {
	constructor(private readonly service: ReasonReturnService){}

	@HttpCode(200)
	@Get('all')
	async getAll(@Query() params: IPagination): Promise<HttpTransportResult<ReasonReturnModel[]>> {
		try {
			const result = await this.service.getAll(params);
			return ({result});
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}

	@HttpCode(200)
	@Get(':id')
	async getById(@Param('id') id: string): Promise<Promise<HttpTransportResult<ReasonReturnModel>>> {
		try {
			const result = await this.service.getById(Number(id));
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.NOT_FOUND)
			}
		}
	}

	@HttpCode(201)
	@Post()
	async create(@Body() dto: ReasonReturnDto): Promise<Promise<HttpTransportResult<ReasonReturnModel>>> {
		try {
			const result = await this.service.createReasonReturn(dto);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}

	@HttpCode(200)
	@Put()
	async update(@Body() reason: ReasonReturnModel): Promise<Promise<HttpTransportResult<ReasonReturnModel>>> {
		try {
			const result = await this.service.updateReasonReturn(reason);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}

	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<Promise<HttpTransportResult<ReasonReturnModel>>> {
		try {
			const result = await this.service.deleteReason(Number(id));
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
			}
		}
	}
}

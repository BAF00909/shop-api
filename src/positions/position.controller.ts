import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { PositionDto } from './dto/position.dto';
import { PositionModel } from './position.model';
import { PositionsService } from './positions.service';
import { HttpTransportResult } from '../common/httpResult.interface';
import { NOT_FOUND } from './errors';
import { IPagination } from 'src/common/paggination.interface';
import { PipeTransformFilter } from 'src/pipes/PipeTransformFilter';

@Controller('position')
export class PositionController {
	positions: PositionModel[] = [];
	constructor(private readonly positionsService: PositionsService) {}

	@HttpCode(200)
	@Get('all')
	@UsePipes(PipeTransformFilter)
	async getPositions(@Query() params: IPagination): Promise<HttpTransportResult<PositionModel[]>> {
		const result = await this.positionsService.getAllPositions(params);
		return ({result});
	}

	@HttpCode(200)
	@Get(':id')
	async getPositionById(@Param('id') id: string): Promise<HttpTransportResult<PositionModel>> {
		const result = await this.positionsService.getPositionById(Number(id));
		return ({result});
	}

	@HttpCode(201)
	@Post('create')
	async create(@Body() dto: PositionDto): Promise<HttpTransportResult<PositionModel>> {
		const result = await this.positionsService.createPosition(dto);
		return ({result});
	}

	@HttpCode(200)
	@Delete(':id')
	async deletePosition(@Param('id') id: string): Promise<HttpTransportResult<PositionModel>> {
		const result = await this.positionsService.deletePosition(Number(id));
		if (!result) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return ({result});
	}

	@HttpCode(200)
	@Patch('update')
	async positionUpdate(@Body() dto: PositionModel): Promise<HttpTransportResult<PositionModel>> {
		const result = await this.positionsService.positionUpdate(dto);
		if (!result) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return ({result});
	}
}

import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { HttpTransportResult } from 'src/common/httpResult.interface';
import { EmployeeModel } from './employee.model';
import { NOT_FOUND } from 'src/positions/errors';
import { EmployeeDto } from './dto/employee.dto';
import { IPagination } from 'src/common/paggination.interface';
import { PipeTransformFilter } from 'src/pipes/PipeTransformFilter';

@Controller('employees')
export class EmployeesController {
	constructor(private readonly employeesService: EmployeesService) {}

	@Get('all')
	@UsePipes(PipeTransformFilter)
	async getEmployees(@Query() params: IPagination): Promise<HttpTransportResult<EmployeeModel[]>> {
		const result = await this.employeesService.getEmployeesAll(params);
		return ({result})
	}
	@HttpCode(200)
	@Get(':id')
	async findById(@Param('id') id: string): Promise<HttpTransportResult<EmployeeModel>> {
		const result = await this.employeesService.getEmployeeById(Number(id));
		if (!result) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND) 
		}
		return ({result})
	}
	@HttpCode(201)
	@Post('create')
	async create(@Body() dto: EmployeeDto): Promise<void> {
		try {
			await this.employeesService.create(dto);
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<HttpTransportResult<EmployeeModel>> {
		const result = await this.employeesService.delete(Number(id));
		if (!result) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND) 
		}
		return ({result})
	}
	@HttpCode(200)
	@Put()
	async update(@Body() body: EmployeeModel): Promise<HttpTransportResult<EmployeeModel>> {
		try {
			const result = await this.employeesService.upload(body);
			return ({result})
		} catch (error) {
			if (error instanceof Error) {
				throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
			}
		}
	}
}

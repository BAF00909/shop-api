import { Injectable } from '@nestjs/common';
import { EmployeeModel } from './employee.model';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeRepository } from './employee-repository';
import { IPagination } from 'src/common/paggination.interface';

@Injectable()
export class EmployeesService {
	constructor(private readonly repository: EmployeeRepository){}
	async getEmployeesAll(params: IPagination): Promise<EmployeeModel[]> {
		const result = await this.repository.get(params);
		return result;
	}
	async getEmployeeById(id: number): Promise<EmployeeModel | null> {
		try {
			const employee = await this.repository.getById(id);
			return employee;
		} catch (error) {
			return null;
		}
	}
	async create(dto: EmployeeDto): Promise<void> {
		try {
			await this.repository.create(dto);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	}
	async delete(id: number): Promise<EmployeeModel | null> {
		try {
			const deletedEmployee = await this.repository.delete(id);
			return deletedEmployee;
		} catch (error) {
			return null;
		}
	}
	async upload(employee: EmployeeModel): Promise<EmployeeModel | null> {
		try {
			return await this.repository.update(employee)
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	}
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EmployeeDto } from "./dto/employee.dto";
import { EmployeeModel } from "./employee.model";
import { IPagination } from "src/common/paggination.interface";
import { PagginationEmployeeModel } from "./pagginationEmployeesModel";

@Injectable()
export class EmployeeRepository {
	constructor(private readonly db: PrismaService){}
	async create({Birthday,FinishDate,FirstName,LastName,PositionId,SecondName,StartDate}: EmployeeDto): Promise<EmployeeModel> {
		return await this.db.employees.create({
			data: {
				Birthday: new Date(Birthday),
				FirstName,
				LastName,
				SecondName,
				StartDate: new Date(StartDate),
				FinishDate: FinishDate ? new Date(FinishDate) : null,
				PositionId
			}
		});
	}

	async get(params: IPagination): Promise<EmployeeModel[]> {
		const {queryParams} = new PagginationEmployeeModel(params);
		return await this.db.employees.findMany(queryParams);
	}

	async getById(id: number): Promise<EmployeeModel> {
		return await this.db.employees.findFirst({
			where: {
				Id: id
			}
		})
	}

	async update({Birthday, FinishDate, FirstName, Id, LastName, PositionId, SecondName, StartDate}: EmployeeModel): Promise<EmployeeModel> {
		return await this.db.employees.update({
			where: {Id: Id},
			data: {
				Birthday,
				FinishDate,
				FirstName,
				LastName,
				PositionId,
				SecondName,
				StartDate
			}
		});
	}

	async delete(id: number): Promise<EmployeeModel> {
		return await this.db.employees.delete({
			where: {
				Id: id
			}
		})
	}

}

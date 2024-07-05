import { PrismaService } from "src/prisma/prisma.service";
import { PositionDto } from "./dto/position.dto";
import { PositionModel } from "./position.model";
import { Injectable } from "@nestjs/common";
import { IPagination } from "src/common/paggination.interface";
import { PagginationPositionModel } from "src/positions/pagginationPositionModel";

@Injectable()
export class PositionsRepository {
	constructor(private db: PrismaService){}

	async create({PositionName}: PositionDto): Promise<PositionModel> {
		return await this.db.positions.create({
			data: {
				PositionName: PositionName
			}
		});
	}

	async get(params: IPagination): Promise<PositionModel[]> {
		const {queryParams} = new PagginationPositionModel(params);
		return await this.db.positions.findMany(queryParams);
	}

	async getById(id: number): Promise<PositionModel> {
		return await this.db.positions.findFirst({
			where: {
				Id: id
			}
		})
	}

	async update(dto: PositionModel): Promise<PositionModel> {
		return await this.db.positions.update({
			where: {Id: dto.Id},
			data: {PositionName: dto.PositionName}
		});
	}

	async delete(id: number): Promise<PositionModel> {
		return await this.db.positions.delete({
			where: {
				Id: id
			}
		})
	}
}

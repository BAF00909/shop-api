import { Injectable } from '@nestjs/common';
import { PositionModel } from './position.model';
import { PositionDto } from './dto/position.dto';
import { PositionsRepository } from './positions-repository';
import { IPagination } from 'src/common/paggination.interface';

@Injectable()
export class PositionsService {
	constructor(private readonly repository: PositionsRepository) {}

	async getAllPositions(params: IPagination): Promise<PositionModel[]> {
		const result = await this.repository.get(params);
		return result;
	}
	async getPositionById(id: number): Promise<PositionModel | null> {
		const result = await this.repository.getById(id);
		return result;
	}
	async createPosition(dto: PositionDto): Promise<PositionModel>{
		try {
			return await this.repository.create(dto);
		} catch (error) {
			return null;
		}
	}
	async deletePosition(id: number): Promise<PositionModel | null> {
		try {
			const result = await this.repository.delete(id)
			return result;
		} catch (error) {
			return null;
		}

	}
	async positionUpdate(dto: PositionModel): Promise<PositionModel | null> {
		try {
			const result = await this.repository.update(dto)
			return result;
		} catch (error) {
			return null;
		}
	}
}

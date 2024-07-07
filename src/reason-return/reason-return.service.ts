import { Injectable } from '@nestjs/common';
import { ReasonReturnRepository } from './reason-return-repository';
import { ReasonReturnModel } from './reason-return-model';
import { IPagination } from 'src/common/paggination.interface';
import { ReasonReturnDto } from './dto/reason-return-create.dto';

@Injectable()
export class ReasonReturnService {
	constructor(private readonly repository: ReasonReturnRepository){}
	async getAll(params: IPagination): Promise<ReasonReturnModel[]> {
		return await this.repository.get(params);
	}
	async getById(id: number): Promise<ReasonReturnModel | null> {
		return await this.repository.getById(id);
	}
	async createReasonReturn(dto: ReasonReturnDto): Promise<ReasonReturnModel> {
		return await this.repository.create(dto);
	}
	async updateReasonReturn(reason: ReasonReturnModel): Promise<ReasonReturnModel> {
		return await this.repository.update(reason);
	}
	async deleteReason(id: number): Promise<ReasonReturnModel> {
		return await this.repository.delete(id);
	}
}

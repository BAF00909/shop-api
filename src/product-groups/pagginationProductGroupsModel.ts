import { IPagination } from "../common/paggination.interface";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class PagginationProductGroupsModel {
	public queryParams: Prisma.ProductGroupsFindManyArgs<DefaultArgs> = {}; // Prisma.PositionsFindManyArgs<DefaultArgs>
	constructor(params: IPagination) {
		const {skip, take, filter, sortBy} = params;
		if (skip) {
			this.queryParams.skip = Number(skip);
		}
		if (take) {
			this.queryParams.take = Number(take);
		}
		if (filter) {
			this.queryParams.where = filter.reduce((acc, f) => {
				acc[f.property] = {in: f.value};
				return acc;
			}, {})
		}
		if (sortBy) {
			this.queryParams.orderBy = {
				[sortBy.property]: sortBy.value
			};
		}
	}
}
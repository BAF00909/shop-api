interface IFilter {
	property: string,
	value: string | string[]
}
export interface ISortedBy {
	property: string,
	value: 'desc' | 'asc',
}
export interface IPagination {
	skip?: number,
	take?: number,
	filter?: IFilter[],
	sortBy?: ISortedBy
}
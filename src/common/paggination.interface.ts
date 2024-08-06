interface IFilter {
	property: string,
	value: string | string[]
}
export interface ISortedBy {
	property: string,
	value: 'desc' | 'asc',
}
export interface IPagination {
	skip?: string,
	take?: string,
	filter?: IFilter[],
	sortBy?: ISortedBy
}
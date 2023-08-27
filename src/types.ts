export interface ICommonPageProps<SearchParamKeys extends string> {
	params: {
		slug?: string[];
	};
	searchParams: Record<SearchParamKeys, string> | {};
}

export type TSortTypes = 1 | 2 | 3 | 4;

export interface IPagination {
	from: number;
	size: number;
	total: number;
	sortType: TSortTypes;
}

export interface IApiResponse<FacetOptionValue> {
	pagination: IPagination;
	facets: IFacet<FacetOptionValue>[];
	products: IProduct[];
}

export interface IFacetOption<OptionValue> {
	identifier: string;
	value: OptionValue;
	displayValue: string;
	productCount?: number;
	priority: number;
	linkSlug?: string;
	childOptions?: IFacetOption<OptionValue>[];
}

export interface IFacet<OptionValue> {
	identifier: string;
	displayName: string;
	priority: number;
	options: IFacetOption<OptionValue>[];
	facetType: number;
}

// Not defined all of schema here, just the ones we need to save time
export interface IProduct {
	id: string;
}

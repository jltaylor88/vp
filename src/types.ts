export interface ICommonPageProps<SearchParamKeys extends string> {
	params: {
		slug?: string[];
	};
	searchParams: Record<SearchParamKeys, string> | {};
}

type TSortTypes = 1 | 2 | 3 | 4;

type TFacetKeys =
	| "prices"
	| "toiletStyle"
	| "colour"
	| "flushType"
	| "toiletProjection"
	| "toiletWidth"
	| "toiletHeight"
	| "softClosingSeat"
	| "toiletShape"
	| "brands"
	| "isOnPromotion"
	| "stockStatus"
	| "categories";

interface IFacetOption<OptionValue, LinkSlug = never, ChildOptions = never> {
	identifier: TFacetKeys;
	value: OptionValue;
	displayValue: string;
	productCount?: number;
	priority: number;
	linkSlug: LinkSlug;
	childOptions: IFacetOption<OptionValue>[];
}

type TPricesOption = IFacetOption<{
	gte: number;
	lte: number;
}>;

type TToiletStyleOption = IFacetOption<string>;

type TColourOption = IFacetOption<string>;

type TFlushTypeOption = IFacetOption<string>;

type TToiletProjectionOption = IFacetOption<string>;

type TToiletWidthOption = IFacetOption<string>;

type TToiletHeightOption = IFacetOption<string>;

type TSoftClosingSeatOption = IFacetOption<string>;

type TToiletShapeOption = IFacetOption<string>;

type TBrandsOption = IFacetOption<string>;

type TIsOnPromotionOption = IFacetOption<boolean>;

type TStockStatusOption = IFacetOption<boolean>;

type TCategoriesOption = IFacetOption<
	string,
	string,
	IFacetOption<string, string, never>
>;

interface IPagination {
	from: number;
	size: number;
	total: number;
	sortType: TSortTypes;
}

interface IFacet<OptionValue> {
	identifier: string;
	displayName: string;
	priority: number;
	options: IFacetOption<OptionValue>[];
	facetType: number;
}

// Not defined all of schema here, just the ones we need to save time
interface IProduct {
	id: string;
}

export type TFacets =
	| IFacet<TPricesOption>
	| IFacet<TToiletStyleOption>
	| IFacet<TColourOption>
	| IFacet<TFlushTypeOption>
	| IFacet<TToiletProjectionOption>
	| IFacet<TToiletWidthOption>
	| IFacet<TToiletHeightOption>
	| IFacet<TSoftClosingSeatOption>
	| IFacet<TToiletShapeOption>
	| IFacet<TBrandsOption>
	| IFacet<TIsOnPromotionOption>
	| IFacet<TStockStatusOption>
	| IFacet<TCategoriesOption>;

type TFacetArray = [
	IFacet<TPricesOption>,
	IFacet<TToiletStyleOption>,
	IFacet<TColourOption>,
	IFacet<TFlushTypeOption>,
	IFacet<TToiletProjectionOption>,
	IFacet<TToiletWidthOption>,
	IFacet<TToiletHeightOption>,
	IFacet<TSoftClosingSeatOption>,
	IFacet<TToiletShapeOption>,
	IFacet<TBrandsOption>,
	IFacet<TIsOnPromotionOption>,
	IFacet<TStockStatusOption>,
	IFacet<TCategoriesOption>
];

export interface IApiResponse {
	pagination: IPagination;
	facets: TFacetArray;
	products: IProduct[];
}

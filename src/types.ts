export interface ICommonPageProps<SearchParamKeys extends string> {
	params: {
		slug?: string[];
	};
	searchParams: Record<SearchParamKeys, string> | {};
}

export type TSortTypes = 1 | 2 | 3 | 4;

export type TFacetKeys =
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

export interface IFacetOption<OptionValue, LinkSlug = never> {
	identifier: string;
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

type TCategoriesOption = IFacetOption<string, string>;

export type TFacetOptions =
	| TPricesOption
	| TToiletStyleOption
	| TColourOption
	| TFlushTypeOption
	| TToiletProjectionOption
	| TToiletWidthOption
	| TToiletHeightOption
	| TSoftClosingSeatOption
	| TToiletShapeOption
	| TBrandsOption
	| TIsOnPromotionOption
	| TStockStatusOption
	| TCategoriesOption;

interface IPagination {
	from: number;
	size: number;
	total: number;
	sortType: TSortTypes;
}

interface IFacet<OptionValue> {
	identifier: TFacetKeys;
	displayName: string;
	priority: number;
	options: IFacetOption<OptionValue>[];
	facetType: number;
}

// Not defined all of schema here, just the ones we need to save time
export interface IProduct {
	id: string;
	productName: string;
	slug: string;
	averageRating?: number;
	reviewsCount: number;
	price: {
		currencyCode: string;
		wasPriceIncTax: number;
		priceIncTax: number;
		isOnPromotion: boolean;
		discountPercentage?: number;
		monthlyFinanceEstimate?: number;
	};
	image: {
		url: string;
		attributes: {
			imageAltText: string;
		};
	};
	attributes: {
		isBestSeller: boolean;
	};
	brand: {
		brandImage: {
			url: string;
			attributes: {
				imageAltText: string;
			};
		};
	};
	stockStatus: {
		status: string;
	};
}

export type TFacets = IFacet<TFacetOptions>;

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

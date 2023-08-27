import { TAllowedQueryParams } from "@/app/[...slug]/page";
import _ from "lodash";

type TParsePageSearchParams = (
	searchParams: {} | Record<TAllowedQueryParams, string>
) => {
	pageNumber: number;
	sizeNumber: number;
	additionalPages: number;
	parsedKeyValuePairs: Record<string, any>;
};

const parsePageSearchParams: TParsePageSearchParams = searchParams => {
	// Extension would be to allow for a page and editable page size instead of load more methodology
	const pageParam =
		"page" in searchParams ? Number(searchParams.page) : undefined;
	// Both page = 0 and page = 1 return the first page of results
	const pageNumber = !pageParam || isNaN(pageParam) ? 1 : pageParam;
	const size = "size" in searchParams ? Number(searchParams.size) : undefined;
	const sizeNumber = !size || isNaN(size) ? 30 : size;

	const ap = "ap" in searchParams ? Number(searchParams.ap) : undefined;
	const additionalPages = !ap || isNaN(ap) ? 0 : ap;

	// Define a custom predicate function to check if the key starts with 'f.'
	const startsWithF = (_value: string | string[], key: string) =>
		_.startsWith(key, "f.");

	// Use _.pickBy() to filter properties based on the predicate
	const filteredParams: _.Dictionary<string | string[]> = _.pickBy(
		searchParams,
		startsWithF
	);

	// Get the keys of the filtered params without the 'f.' prefix
	const keyValuePairs = _.mapKeys(filteredParams, (value, key) =>
		key.substring(2)
	);

	// Convert stringified values to parsed values
	const parsedKeyValuePairs = _.mapValues(keyValuePairs, value => {
		try {
			if (typeof value === "string") {
				return JSON.parse(value);
			} else {
				return value.map(v => JSON.parse(v));
			}
		} catch (error) {
			return value;
		}
	});

	return {
		pageNumber,
		sizeNumber,
		additionalPages,
		parsedKeyValuePairs,
	};
};

export default parsePageSearchParams;

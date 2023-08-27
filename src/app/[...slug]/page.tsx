// Renders the content for the products pages

import { interviewListingsEndpoint } from "@/apiEndpoints";
import FilterAccordion from "@/clientComponents/filterAccordion";
import { IApiResponse, ICommonPageProps } from "@/types";
import getListingsData from "@/utils/getListingData";
import { Box, Grid, Typography } from "@mui/material";
import _ from "lodash";
import { useCallback } from "react";

type TAllowedQueryParams = "ap" | "page";

export default async function Products(
	props: ICommonPageProps<TAllowedQueryParams>
) {
	// Take the strings in the params.slug array and join them with a /
	const query = props.params?.slug?.join("/");

	// Throw an error if the query is undefined
	if (!query) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("We were unable to fetch your data: query is undefined");
	}

	// Extension would be to allow for a page and editable page size instead of load more methodology
	const pageParam =
		"page" in props.searchParams ? Number(props.searchParams.page) : undefined;
	// Both page = 0 and page = 1 return the first page of results
	const pageNumber = !pageParam || isNaN(pageParam) ? 1 : pageParam;
	const size =
		"size" in props.searchParams ? Number(props.searchParams.size) : undefined;
	const sizeNumber = !size || isNaN(size) ? 30 : size;

	const ap =
		"ap" in props.searchParams ? Number(props.searchParams.ap) : undefined;
	const additionalPages = !ap || isNaN(ap) ? 0 : ap;

	// Define a custom predicate function to check if the key starts with 'f.'
	const startsWithF = (_value: string | string[], key: string) =>
		_.startsWith(key, "f.");

	// Use _.pickBy() to filter properties based on the predicate
	const filteredParams: _.Dictionary<string | string[]> = _.pickBy(
		props.searchParams,
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

	const data = await getListingsData(
		query,
		pageNumber,
		sizeNumber,
		additionalPages,
		parsedKeyValuePairs
	);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography
					variant='h2'
					fontSize={"1.5rem"}
					color='text.primary'
					fontWeight={700}
					marginBottom={"1rem"}
				>
					Filter By
				</Typography>
				{data.facets.map((facet, idx) => (
					<Box
						key={facet.identifier}
						marginBottom={idx === data.facets.length - 1 ? 0 : "1rem"}
					>
						<FilterAccordion facet={facet} numInitialOptions={2} />
					</Box>
				))}
			</Grid>
			<Grid item xs={12} sm={6} md={8} lg={9}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6} lg={4}>
						Product
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						Product
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						Product
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						Product
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

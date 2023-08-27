// Renders the content for the products pages

import { interviewListingsEndpoint } from "@/apiEndpoints";
import FilterAccordion from "@/clientComponents/filterAccordion";
import { IApiResponse, ICommonPageProps } from "@/types";
import { Grid, Typography } from "@mui/material";
import { useMemo } from "react";

type TAllowedQueryParams = "ap" | "page";

// Forward the request to the API
const getListingsData = async (
	query: string,
	pageNumber?: number,
	size?: number,
	additionalPages?: number
) => {
	const body = JSON.stringify({
		query,
		pageNumber,
		size,
		additionalPages,
	});

	const res: Response = await fetch(
		interviewListingsEndpoint + "?apiKey=" + process.env.APIKey,
		{
			body,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		const t = await res.text();
		throw new Error(t);
	}
	const data: IApiResponse = await res.json();

	return data;
};

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
	const sizeNumber = !size || isNaN(size) ? 0 : size;

	const ap =
		"ap" in props.searchParams ? Number(props.searchParams.ap) : undefined;
	const additionalPages = !ap || isNaN(ap) ? 0 : ap;

	const data = await getListingsData(
		query,
		pageNumber,
		sizeNumber,
		additionalPages
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
				<FilterAccordion
					facetContents={[
						{
							key: "0",
							element: <div>Test</div>,
						},
						{
							key: "1",
							element: <div>Test 2</div>,
						},
					]}
					facetTitle={"Price"}
					numInitialFacets={1}
				/>
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

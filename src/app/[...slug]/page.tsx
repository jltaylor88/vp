// Renders the content for the products pages

import FilterAccordion from "@/clientComponents/filterAccordion";
import SortingSelect from "@/clientComponents/sortingSelect";
import ViewMoreButton from "@/clientComponents/viewMoreButton";
import ProductCard from "@/serverComponents/productCard";
import { ICommonPageProps } from "@/types";
import getListingsData from "@/utils/getListingData";
import parsePageSearchParams from "@/utils/parsePageSearchParams";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import _ from "lodash";

export type TAllowedQueryParams = "ap" | "page" | "sort";

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

	const {
		pageNumber,
		sizeNumber,
		additionalPages,
		parsedKeyValuePairs,
		sortNumber,
	} = parsePageSearchParams(props.searchParams);

	const data = await getListingsData(
		query,
		sortNumber,
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
				<Box
					display={"flex"}
					alignItems={"flex-end"}
					justifyContent={"space-between"}
					marginBottom={"1rem"}
					position={"relative"}
				>
					<SortingSelect />
					<Typography variant='body1' color='text.primary'>
						{data.pagination.total} results
					</Typography>
				</Box>
				<Grid container spacing={2}>
					{data.products.map(product => {
						return (
							<Grid key={product.id} item xs={12} md={6} lg={4}>
								<ProductCard product={product} />
							</Grid>
						);
					})}
				</Grid>
				<Box
					display='flex'
					justifyContent={"center"}
					alignItems={"center"}
					marginY={2}
				>
					<Box>
						<Typography variant='body1' color='text.primary'>
							You have viewed {data.pagination.size} of {data.pagination.total}{" "}
							results
						</Typography>
						<LinearProgress
							sx={{ marginY: 2 }}
							variant='determinate'
							value={Math.floor(
								(data.pagination.size / data.pagination.total) * 100
							)}
						/>
						<Box display='flex' justifyContent='center'>
							<ViewMoreButton
								additionalPages={additionalPages}
								pageSize={sizeNumber}
								total={data.pagination.total}
							/>
						</Box>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}

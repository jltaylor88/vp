// Renders the content for the products pages

import FilterAccordion from "@/clientComponents/filterAccordion";
import { Grid, Typography } from "@mui/material";

export default function Products() {
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

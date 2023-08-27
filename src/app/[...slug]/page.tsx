// Renders the content for the products pages

import { Grid } from "@mui/material";

export default function Products() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				Filtering
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

import { IFacetOption, TFacetOptions } from "@/types";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

interface ICategoryLinkProps {
	category: IFacetOption<TFacetOptions, never>;
}

const CategoryLink: FunctionComponent<ICategoryLinkProps> = ({ category }) => {
	return (
		<Link href={category.linkSlug}>
			<Box sx={{ paddingY: "0.8rem" }}>
				<Typography
					variant='button'
					color='success.main'
					textTransform={"none"}
					fontSize={"1rem"}
				>
					{category.displayValue}
				</Typography>
			</Box>
		</Link>
	);
};

export default CategoryLink;

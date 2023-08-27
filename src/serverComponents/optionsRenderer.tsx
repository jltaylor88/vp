import { TFacetKeys, IFacetOption, TFacetOptions } from "@/types";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import FilterCheckbox from "../clientComponents/filterCheckbox";

export interface IOptionsRendererProps {
	count?: number;
	facetId: TFacetKeys;
	option: IFacetOption<TFacetOptions, never>;
}

const OptionsRenderer: FunctionComponent<IOptionsRendererProps> = ({
	facetId,
	option,
	count,
}) => {
	// Render the category options as links
	if (facetId === "categories") {
		return (
			<Link href={option.linkSlug}>
				<Box sx={{ paddingY: "0.8rem" }}>
					<Typography
						variant='button'
						color='success.main'
						textTransform={"none"}
						fontSize={"1rem"}
					>
						{option.displayValue}
					</Typography>
				</Box>
			</Link>
		);
	} else {
		return (
			<FilterCheckbox
				count={count}
				facetId={facetId}
				label={option.displayValue}
				value={option.value}
			/>
		);
	}
};

export default OptionsRenderer;

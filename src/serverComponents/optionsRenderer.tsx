import { TFacetKeys, IFacetOption, TFacetOptions } from "@/types";
import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import FilterCheckbox from "../clientComponents/filterCheckbox";
import CategoryLink from "./categoryLink";

export interface IOptionsRendererProps {
	count?: number;
	facetId: TFacetKeys;
	option: IFacetOption<TFacetOptions, never>;
}

const renderNestedLinks = (catOption: IFacetOption<TFacetOptions, never>) => {
	return (
		<>
			<CategoryLink category={catOption} />
			{catOption.childOptions && catOption.childOptions.length > 0
				? catOption.childOptions.map(child => (
						<Box key={child.identifier} paddingLeft={2}>
							{renderNestedLinks(child)}
						</Box>
				  ))
				: null}
		</>
	);
};

const OptionsRenderer: FunctionComponent<IOptionsRendererProps> = ({
	facetId,
	option,
	count,
}) => {
	// Render the category options as links
	if (facetId === "categories") {
		return renderNestedLinks(option);
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

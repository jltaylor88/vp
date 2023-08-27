"use client";

import {
	Box,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
} from "@mui/material";
import { FunctionComponent, ReactElement, useMemo, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IFacetOption, TFacetKeys, TFacetOptions, TFacets } from "@/types";
import FilterCheckbox from "./filterCheckbox";
import Link from "next/link";
import OptionsRenderer from "./optionsRenderer";

interface IFlterAccordionProps {
	facet: TFacets;
	numInitialOptions?: number;
}

const FilterAccordion: FunctionComponent<IFlterAccordionProps> = ({
	facet,
	numInitialOptions,
}) => {
	const [isExpanded, setIsExpanded] = useState(true);

	// Too inexpensive to justify useCallBack
	const toggleIsExpanded = () => setIsExpanded(prev => !prev);

	const [isExtraExpanded, setIsExtraExpanded] = useState(false);

	// Too inexpensive to justify useCallBack
	const toggleIsExtraExpanded = () => setIsExtraExpanded(prev => !prev);

	const { extraOptions, initialOptions } = useMemo(() => {
		const validNumInitialOptions = Boolean(numInitialOptions);

		return {
			initialOptions: validNumInitialOptions
				? facet.options.slice(0, numInitialOptions)
				: facet.options,
			extraOptions: validNumInitialOptions
				? facet.options.slice(numInitialOptions)
				: undefined,
		};
	}, [facet.options, numInitialOptions]);

	return (
		<>
			<Accordion
				expanded={isExpanded}
				onChange={toggleIsExpanded}
				disableGutters
				square
			>
				<AccordionSummary
					expandIcon={isExpanded ? <RemoveIcon /> : <AddIcon />}
					aria-controls='facet-price-content'
					id='facet-price-header'
					sx={{ borderBottom: "1px solid", borderColor: "grey.400" }}
				>
					<Typography variant='h3' fontSize='1.4rem'>
						{facet.displayName}
					</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ padding: 0, paddingX: "1rem" }}>
					{initialOptions.map(opt => (
						<Box key={opt.identifier}>
							<OptionsRenderer facetId={facet.identifier} option={opt} />
						</Box>
					))}
				</AccordionDetails>
			</Accordion>
			{/* This is the extra facets */}
			{extraOptions && extraOptions.length > 0 ? (
				<Box
					sx={{
						display: isExpanded ? "block" : "none",
					}}
				>
					<Accordion expanded={isExtraExpanded} disableGutters square>
						<AccordionDetails sx={{ padding: 0 }}></AccordionDetails>
						<AccordionSummary
							aria-controls='facet-price-extra-content'
							id='facet-price-extra-header'
							sx={{
								padding: 0,
								minHeight: 0,
								margin: "-12px 0",
							}}
						>
							<Box sx={{ paddingX: "1rem" }}>
								{extraOptions.map(ex => (
									<Box key={ex.identifier}>
										<OptionsRenderer facetId={facet.identifier} option={ex} />
									</Box>
								))}
							</Box>
						</AccordionSummary>
					</Accordion>
					<Box
						flex={1}
						display='flex'
						justifyContent={"center"}
						sx={{ backgroundColor: "grey.400", color: "text.primary" }}
					>
						<Button
							variant='text'
							onClick={toggleIsExtraExpanded}
							sx={{
								paddingY: "1rem",
								color: "text.primary",
								textDecoration: "underline",
								textTransform: "none",
							}}
						>
							{isExtraExpanded ? "Show Less" : "Show More"}
						</Button>
					</Box>
				</Box>
			) : null}
		</>
	);
};

export default FilterAccordion;

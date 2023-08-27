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

interface IFlterAccordionProps {
	facetContents: { key: string; element: ReactElement }[];
	facetTitle: string;
	numInitialFacets?: number;
}

const FilterAccordion: FunctionComponent<IFlterAccordionProps> = ({
	facetContents,
	facetTitle,
	numInitialFacets,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	// Too inexpensive to justify useCallBack
	const toggleIsExpanded = () => setIsExpanded(prev => !prev);

	const [isExtraExpanded, setIsExtraExpanded] = useState(false);

	// Too inexpensive to justify useCallBack
	const toggleIsExtraExpanded = () => setIsExtraExpanded(prev => !prev);

	const { extraFacets, initialFacets } = useMemo(() => {
		const validNumInitialFacets = Boolean(numInitialFacets);

		return {
			initialFacets: validNumInitialFacets
				? facetContents.slice(0, numInitialFacets)
				: facetContents,
			extraFacets: validNumInitialFacets
				? facetContents.slice(numInitialFacets)
				: undefined,
		};
	}, [facetContents, numInitialFacets]);

	return (
		<>
			<Accordion
				expanded={isExpanded}
				onChange={toggleIsExpanded}
				disableGutters
			>
				<AccordionSummary
					expandIcon={isExpanded ? <RemoveIcon /> : <AddIcon />}
					aria-controls='facet-price-content'
					id='facet-price-header'
					sx={{ borderBottom: "1px solid", borderColor: "grey.400" }}
				>
					<Typography variant='h3' fontSize='1.4rem'>
						{facetTitle}
					</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ padding: 0 }}>
					{initialFacets.map(({ key, element }) => (
						<Box key={key} sx={{ padding: "1rem" }}>
							{element}
						</Box>
					))}
				</AccordionDetails>
			</Accordion>
			{/* This is the extra facets */}
			{extraFacets && (
				<>
					<Accordion expanded={isExtraExpanded} disableGutters>
						<AccordionDetails sx={{ padding: 0 }}></AccordionDetails>
						<AccordionSummary
							aria-controls='facet-price-extra-content'
							id='facet-price-extra-header'
							sx={{
								padding: 0,
								minHeight: 0,
								height: "fit-content",
								margin: "-12px 0",
							}}
						>
							<Box>
								{extraFacets.map(({ key, element }) => (
									<Box key={key} sx={{ padding: "1rem" }}>
										{element}
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
				</>
			)}
		</>
	);
};

export default FilterAccordion;

"use client";

import { TFacetKeys } from "@/types";
import { Box, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { isEqual } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FunctionComponent, useCallback, useEffect, useState } from "react";

const Label: FunctionComponent<{ label: string; count?: number }> = ({
	label,
	count,
}) => {
	return (
		<Box>
			<Typography
				variant='button'
				color='text.primary'
				textTransform={"none"}
				fontSize={"1rem"}
			>
				{label}
			</Typography>
			{count !== undefined ? (
				<Typography
					variant='button'
					color='text.secondary'
					textTransform={"none"}
					fontSize={"0.8rem"}
					marginLeft={"0.5rem"}
				>
					({count ?? ""})
				</Typography>
			) : null}
		</Box>
	);
};

interface IFilterCheckboxProps {
	count?: number;
	facetId: TFacetKeys;
	label: string;
	value: any;
}

const FilterCheckbox: FunctionComponent<IFilterCheckboxProps> = ({
	count,
	facetId,
	label,
	value,
}) => {
	const searchParams = useSearchParams();

	const [isChecked, setIsChecked] = useState(searchParams.has(value));

	useEffect(() => {
		// Check if the search params constains `${facetId}=${value}`
		const facetValues = searchParams.getAll(`f.${facetId}`);
		const hasValue = facetValues.includes(JSON.stringify(value));

		setIsChecked(hasValue);
	}, [facetId, searchParams, value]);

	const router = useRouter();
	const pathName = usePathname();

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			// Prevent the bubble up
			event.stopPropagation();
			const checked = event.target.checked;

			// Generate new search params
			const sp = new URLSearchParams(searchParams.toString());
			if (checked) {
				sp.append(`f.${facetId}`, JSON.stringify(value));
				router.push(pathName + "?" + sp.toString());
			} else {
				// Get all the values for the facet
				const facetValues = sp.getAll(`f.${facetId}`);
				// Remove the value from the facet
				const newFacetValues = facetValues.filter(
					v => !isEqual(JSON.parse(v), value)
				);

				// Remove the facet from the search params
				sp.delete(`f.${facetId}`);
				// Add the new facet values to the search params
				newFacetValues.forEach(v => sp.append(`f.${facetId}`, v));
				router.push(pathName + "?" + sp.toString());
			}
		},
		[facetId, pathName, router, searchParams, value]
	);

	return (
		<FormControlLabel
			disabled={count === 0}
			aria-disabled={count === 0}
			control={<Checkbox checked={isChecked} onChange={handleChange} />}
			label={<Label label={label} count={count} />}
			value={value}
		/>
	);
};

export default FilterCheckbox;

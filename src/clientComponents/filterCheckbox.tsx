"use client";

import { TFacetKeys } from "@/types";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FunctionComponent, useCallback, useEffect, useState } from "react";

interface IFilterCheckboxProps {
	facetId: TFacetKeys;
	label: string;
	value: string;
}

const FilterCheckbox: FunctionComponent<IFilterCheckboxProps> = ({
	facetId,
	label,
	value,
}) => {
	const searchParams = useSearchParams();

	const [isChecked, setIsChecked] = useState(searchParams.has(value));
	useEffect(() => {
		// Check if the search params constains `${facetId}=${value}`
		const facetValues = searchParams.getAll(`f.${facetId}`);
		const hasValue = facetValues.includes(value);

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
				sp.append(`f.${facetId}`, value);
				router.push(pathName + "?" + sp.toString());
			} else {
				// Get all the values for the facet
				const facetValues = sp.getAll(`f.${facetId}`);
				// Remove the value from the facet
				const newFacetValues = facetValues.filter(v => v !== value);
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
			control={<Checkbox checked={isChecked} onChange={handleChange} />}
			label={label}
			value={value}
		/>
	);
};

export default FilterCheckbox;

"use client";

import { sortOptions } from "@/constants";
import { TSortTypes } from "@/types";
import sortParamIsValid from "@/utils/sortParamIsValid";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	Box,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";

const SortingSelect: FunctionComponent = () => {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	// Get the value of the 'sort' query param
	const sortParam = searchParams.get("sort");
	const numSortParam = Number(sortParam);

	const [sortBy, setSortBy] = useState<TSortTypes>(
		sortParamIsValid(numSortParam) ? numSortParam : 1
	);

	// Too inexpensive to justify useCallBack
	const handleChange = (event: SelectChangeEvent<TSortTypes>) => {
		// Prevent the bubble up
		event.stopPropagation();
		const v = event.target.value as TSortTypes;

		// Generate new search params
		const sp = new URLSearchParams(searchParams.toString());

		// Remove the sort param
		sp.delete("sort");
		// Add the new sort param
		sp.append("sort", v.toString());

		if (!sortParamIsValid(numSortParam)) {
			// If the sort param is invalid, replace the current url with the new one
			router.replace(pathName + "?" + sp.toString());
		} else {
			router.push(pathName + "?" + sp.toString());
		}
	};

	useEffect(() => {
		// Get the value of the 'sort' query param
		const sortParam = searchParams.get("sort");
		const numSortParam = Number(sortParam);

		if (sortParamIsValid(numSortParam)) {
			setSortBy(numSortParam);
		} else {
			setSortBy(1);
		}
	}, [numSortParam, pathName, router, searchParams, sortBy]);

	return (
		<Box sx={{ width: 300 }}>
			<FormControl fullWidth>
				<InputLabel id='sort-by-select-label'>Sort By</InputLabel>
				<Select
					sx={{ position: "relative" }}
					labelId='sort-by-select-label'
					id='sort-by-select'
					value={sortBy}
					label='Sort By'
					onChange={handleChange}
					MenuProps={{
						sx: { position: "absolute", top: "0" },
					}}
				>
					{sortOptions.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default SortingSelect;

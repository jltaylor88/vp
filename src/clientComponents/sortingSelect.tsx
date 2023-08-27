"use client";

import { TSortTypes } from "@/types";
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

const sortOptions: { value: TSortTypes; label: string }[] = [
	{
		value: 1,
		label: "Recommended",
	},
	{
		value: 2,
		label: "Price: Low to High",
	},
	{
		value: 3,
		label: "Price: High to Low",
	},
	{
		value: 4,
		label: "Largest Discount",
	},
];

const sortParamIsValid = (sortParam: number): sortParam is TSortTypes => {
	return Boolean(
		sortParam && sortOptions.some(option => option.value === Number(sortParam))
	);
};

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
		setSortBy(event.target.value as TSortTypes);
	};

	useEffect(() => {
		// Generate new search params
		const sp = new URLSearchParams(searchParams.toString());
		// Remove the sort param
		sp.delete("sort");
		// Add the new sort param
		sp.append("sort", sortBy.toString());
		router.push(pathName + "?" + sp.toString());
	}, [pathName, router, searchParams, sortBy]);

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

import { TSortTypes } from "./types";

export const sortOptions: { value: TSortTypes; label: string }[] = [
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

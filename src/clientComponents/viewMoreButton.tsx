"use client";

import { Button } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useCallback } from "react";

interface IViewMoreButtonProps {
	additionalPages: number;
	pageSize: number;
	total: number;
}

const ViewMoreButton: FunctionComponent<IViewMoreButtonProps> = ({
	additionalPages,
	pageSize,
	total,
}) => {
	const searchParams = useSearchParams();
	const pathName = usePathname();

	// Get the search param with name ap
	const ap = searchParams.get("ap");
	// If ap is undefined, set it to 0
	const num = Number(ap);
	const apNumber = ap && !isNaN(num) && num > 0 ? num : 0;

	const router = useRouter();

	const disabled = (additionalPages + 1) * pageSize >= total;

	const onClick = useCallback(() => {
		// Create a new URLSearchParams object
		const newSp = new URLSearchParams(searchParams.toString());
		if (disabled) {
			return;
		} else {
			// Add 1 to the ap search param
			const newNum = apNumber + 1;
			// Delete the ap search param
			newSp.delete("ap");
			// Add the ap search param with the new value
			newSp.append("ap", newNum.toString());

			// Push the new search params to the router
			router.push(pathName + "?" + newSp.toString());
		}
	}, [apNumber, disabled, pathName, router, searchParams]);

	return (
		<Button
			disabled={disabled}
			aria-disabled={disabled}
			variant={"outlined"}
			onClick={onClick}
		>
			View More
		</Button>
	);
};

export default ViewMoreButton;

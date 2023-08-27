"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FunctionComponent, useCallback, useState } from "react";

interface IFilterCheckboxProps {
	label: string;
	value: string;
}

const FilterCheckbox: FunctionComponent<IFilterCheckboxProps> = ({
	label,
	value,
}) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			// Prevent the bubble up
			event.stopPropagation();

			setIsChecked(event.target.checked);
		},
		[]
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

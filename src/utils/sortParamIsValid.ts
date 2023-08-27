import { sortOptions } from "@/constants";
import { TSortTypes } from "@/types";

const sortParamIsValid = (sortParam: number): sortParam is TSortTypes => {
	return Boolean(
		sortParam && sortOptions.some(option => option.value === Number(sortParam))
	);
};

export default sortParamIsValid;

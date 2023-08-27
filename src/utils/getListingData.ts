import { interviewListingsEndpoint } from "@/apiEndpoints";
import { IApiResponse } from "@/types";
import generateFacetsPayload from "./generateFacetsPayload";

// Forward the request to the API
const getListingsData = async (
	query: string,
	pageNumber?: number,
	size?: number,
	additionalPages?: number,
	facets?: Record<string, string[] | string>
) => {
	const body = JSON.stringify({
		query,
		pageNumber,
		size,
		additionalPages,
		facets: facets ? generateFacetsPayload(facets) : undefined,
	});

	const res: Response = await fetch(
		interviewListingsEndpoint + "?apiKey=" + process.env.APIKey,
		{
			body,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		const t = await res.text();
		throw new Error(t);
	}
	const data: IApiResponse = await res.json();

	return data;
};

export default getListingsData;

const generateFacetsPayload = (facets: Record<string, string[] | string>) => {
	const facetsPayload: Record<
		string,
		{
			value: string | Record<string, string>;
		}[]
	> = {};

	for (const key in facets) {
		if (facets.hasOwnProperty(key)) {
			const element = facets[key];
			if (Array.isArray(element)) {
				facetsPayload[key] = element.map(value => {
					return { value };
				});
			} else {
				facetsPayload[key] = [{ value: element }];
			}
		}
	}
	return facetsPayload;
};

export default generateFacetsPayload;

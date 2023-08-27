export const baseURL = process.env.APIBaseURL || "http://localhost:3000";
const endpointFactory = (path: string) => `${baseURL}${path}`;

export const interviewListingsEndpoint = endpointFactory(
	"/interviews/listings"
);

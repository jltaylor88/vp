import { Box, Container } from "@mui/material";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Victoria Plumbing Demo",
	description: "Demo of the Victoria Plumbing products API",
};

const navItems = [
	{
		displayText: "Toilets",
		href: "/toilets",
	},
	{
		displayText: "Baths",
		href: "/baths",
	},
	{
		displayText: "Corner Baths",
		href: "baths/corner-baths",
	},
];

// Sets the rudmientary shared layout for the app (the navigation bar and the consistent main padding)

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Box
					sx={{
						minHeight: "100vh",
						backgroundColor: "grey.300",
					}}
				>
					{/* I have included a primitive navigation system to demo a few different product types and their API calls */}
					<Box
						sx={{
							display: { xs: "block", sm: "flex" },
							backgroundColor: "success.light",
							justifyContent: "center",
						}}
					>
						{navItems.map(item => (
							<Link key={item.href} href={item.href}>
								<Box sx={{ padding: "1rem" }}>{item.displayText}</Box>
							</Link>
						))}
					</Box>
					<Container sx={{ padding: "2rem" }}>{children}</Container>
				</Box>
			</body>
		</html>
	);
}

import { IProduct } from "@/types";
import { Box, Chip, Rating } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FunctionComponent } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export interface IProductCardProps {
	product: IProduct;
}

const currencies = {
	GBP: "£",
};

const ProductCard: FunctionComponent<IProductCardProps> = ({ product }) => {
	const currency =
		product.price.currencyCode in currencies
			? currencies[product.price.currencyCode as keyof typeof currencies]
			: "";
	return (
		<Card sx={{ height: "440px" }}>
			<Box sx={{ position: "relative" }}>
				{/* Todo: would optimise images with more time */}
				<CardMedia
					sx={{ height: 240 }}
					image={product.image.url}
					title={product.image.attributes.imageAltText}
				/>
				{product.price.isOnPromotion && (
					<Chip
						label='Sale'
						color='error'
						sx={{ position: "absolute", top: 10, left: 10 }}
					/>
				)}
				{product.attributes.isBestSeller && (
					<Box
						sx={{ backgroundColor: "primary.main", opacity: 0.8 }}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						position={"absolute"}
						bottom={0}
						width={"100%"}
					>
						<Typography variant='body2' color='common.white'>
							Best Seller
						</Typography>
					</Box>
				)}
			</Box>
			<CardContent sx={{ padding: 1 }}>
				<CardMedia
					sx={{ width: 100, height: 35 }}
					image={product.brand.brandImage.url}
					title={product.brand.brandImage.attributes.imageAltText}
				/>
				<Link href={product.slug}>
					<Typography
						noWrap
						textTransform={"none"}
						sx={{ textDecoration: "underline" }}
						paddingY={1}
						fontSize={"1rem"}
					>
						{product.productName}
					</Typography>
				</Link>

				<Box display='flex' alignItems='baseline'>
					<Typography
						variant='body2'
						color='warning.dark'
						fontWeight={"bold"}
						fontSize={"1.5rem"}
					>
						{currency}
						{product.price.priceIncTax}
					</Typography>
					{product.price.isOnPromotion && (
						<Typography
							variant='body2'
							color='text.secondary'
							fontWeight={500}
							fontSize={"1rem"}
							marginLeft={1}
							sx={{ textDecoration: "line-through" }}
						>
							Was {currency}
							{product.price.wasPriceIncTax}
						</Typography>
					)}
				</Box>
				{product.price.monthlyFinanceEstimate && (
					<Typography variant='body2' color='primary.light'>
						Finance from {currency}
						{product.price.monthlyFinanceEstimate}/month
					</Typography>
				)}
				{/* Couldn't find any documentation on what D vs G meant */}
				{product.stockStatus.status === "D" && (
					<Box display={"flex"} alignItems={"center"}>
						<CheckBoxIcon sx={{ color: "success.light" }} />
						<Typography variant='body2' color='text.secondary'>
							In Stock
						</Typography>
					</Box>
				)}
				{product.reviewsCount > 0 && (
					<Box display='flex' alignItems={"center"}>
						<Rating
							name='read-only'
							value={product.averageRating}
							readOnly
							sx={{ marginLeft: "-5px" }}
						/>
						<Typography variant='body2' color='text.secondary'>
							{product.reviewsCount}
						</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default ProductCard;

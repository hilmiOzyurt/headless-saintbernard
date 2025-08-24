import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "../../../lib/shopify";
import ProductDetails from "@/components/ProductDetails";

export async function generateStaticParams() {
    const products = await getProducts();

    return products.map(({ node }: { node: { handle: string } }) => ({
        handle: node.handle,
    }));
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
    const product = await getProductByHandle(params.handle);

    if (!product) {
        notFound();
    }

    return <ProductDetails product={product} />;
}
"use client";

import { useCart } from "@/context/CartContext";
import { ProductNode } from "@/types/menu";
import { Image, Option } from "@/types/selectedProduct";

/* eslint-disable @next/next/no-img-element */

export default function ProductDetails({ product }: { product: ProductNode }) {
    const { addToCart } = useCart();

    const mainImage = product.featuredImage || product.images.edges[0]?.node;

    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    const compareAtPrice = product.priceRange.maxVariantPrice ? parseFloat(product.priceRange.maxVariantPrice.amount) : null;
    const currencyCode = product.priceRange.minVariantPrice.currencyCode || 'USD';

    const isOnSale = compareAtPrice && compareAtPrice > price;


    const handleAddToCart = (product: ProductNode) => {
        addToCart(product);
        alert(`${product.title} Added to Cart!`);
    };


    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: currencyCode,
        }).format(amount);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white shadow-lg rounded-xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                        <div className="flex flex-col items-center">
                            {mainImage && (
                                <div className="w-full aspect-square overflow-hidden rounded-lg border-2 border-gray-200">
                                    <img
                                        src={mainImage.url}
                                        alt={mainImage.altText || product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="mt-4 grid grid-cols-5 gap-3">
                                {product.images.edges.map(({ node: image }: { node: Image }, index: number) => (
                                    <div key={index} className="aspect-square overflow-hidden rounded-md border-2 border-transparent hover:border-indigo-500 cursor-pointer transition-transform duration-200 hover:scale-105">
                                        <img src={image.url} alt={image.altText || "Product image"} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                                    {product.title}
                                </h1>

                                <div className="mt-4 flex items-baseline gap-3">
                                    <p className="text-3xl lg:text-4xl font-semibold text-gray-800">
                                        {formatPrice(price)}
                                    </p>
                                    {isOnSale && compareAtPrice && (
                                        <p className="text-xl lg:text-2xl font-medium text-gray-500 line-through">
                                            {formatPrice(compareAtPrice)}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6 prose prose-lg text-gray-600">
                                    <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                                </div>
                            </div>


                            <div className="mt-8">
                                {product.options.map((option: Option) => (
                                    <div key={option.id} className="mb-6">
                                        <h3 className="text-md font-semibold text-gray-800">{option.name}</h3>
                                        <div className="flex flex-wrap gap-3 mt-3">
                                            {option.values.map((value: string) => (
                                                <button key={value} className="px-5 py-2.5 border-2 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => handleAddToCart(product)} className="mt-10 w-full bg-indigo-600 text-white py-4 px-8 rounded-lg text-lg font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 hover:shadow-md">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
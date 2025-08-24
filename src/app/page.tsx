/* eslint-disable @next/next/no-async-client-component */
"use client";

/* eslint-disable @next/next/no-img-element */
import { ProductEdge, ProductNode } from "@/types/menu";
import { getProducts } from "../lib/shopify";
import Link from 'next/link';
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";


export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductEdge[]>([]);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: ProductNode) => {
    addToCart(product);
    alert(`${product.title} sepete eklendi!`);
  };



  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Welcome to My Headless Store
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover our newest and most popular products.
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((node: ProductEdge) => (
              <div key={node.node.id} className="group relative bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square w-full overflow-hidden">
                  <Link href={`/products/${node.node.handle}`} className="cursor-pointer">
                    {node.node.featuredImage ? (
                      <img
                        src={node.node.featuredImage.url}
                        alt={node.node.featuredImage.altText || node.node.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </Link>
                </div>
                <div className="p-4 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    <Link href={`/products/${node.node.handle}`}>
                      {node.node.title}
                    </Link>
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">
                      {new Intl.NumberFormat('tr-TR', {
                        style: 'currency',
                        currency: node?.node?.priceRange?.minVariantPrice?.currencyCode || 'TRY',
                      }).format(parseFloat(node?.node?.priceRange?.minVariantPrice?.amount))}
                    </p>
                  </div>
                  <button onClick={() => handleAddToCart(node?.node)} className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
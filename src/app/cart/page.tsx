"use client";

import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.priceRange.minVariantPrice.amount) * item.quantity, 0);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl mb-12">
                    Your Cart
                </h1>
                {cart.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-xl shadow-lg">
                        <p className="text-xl text-slate-600 mb-6">Your cart is empty</p>
                        <Link
                            href="/"
                            className="mt-4 inline-block bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors duration-300"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-start justify-between bg-white p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
                                    <div className="flex items-start">
                                        <img
                                            src={item.images.edges[0].node.url}
                                            alt={item.title}
                                            className="h-24 w-24 object-cover rounded-lg"
                                        />
                                        <div className="ml-6">
                                            <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                                            <p className="text-slate-600 mt-1">{parseFloat(item.priceRange.minVariantPrice.amount).toFixed(2)} USD</p>
                                            <div className="flex items-center mt-4">
                                                <span className="text-sm text-slate-500 mr-3">Quantity</span>
                                                <div className="flex items-center border border-slate-200 rounded-lg">
                                                    <button
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="px-3 py-1 font-mono text-lg text-slate-700 hover:bg-slate-100 transition-colors rounded-l-lg"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-1 font-medium text-slate-800 tabular-nums">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="px-3 py-1 font-mono text-lg text-slate-700 hover:bg-slate-100 transition-colors rounded-r-lg"
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg lg:sticky lg:top-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-slate-600">
                                    <span>Sub Total</span>
                                    <span>{subtotal.toFixed(2)} USD</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Cargo</span>
                                    <span>To be calculated</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-xl text-slate-800 mt-6 border-t pt-6">
                                <span>Total</span>
                                <span>{subtotal.toFixed(2)} USD</span>
                            </div>
                            <button className="mt-8 w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                                Go to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
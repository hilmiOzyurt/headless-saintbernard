"use client";

import { CartContextType } from '@/types/cartContext';
import { ProductNode } from '@/types/menu';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    increaseQuantity: () => { },
    decreaseQuantity: () => { },
});

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<ProductNode[]>([]);

    const addToCart = (product: ProductNode) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item: ProductNode) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item: ProductNode) => item.id !== productId));
    };

    const increaseQuantity = (itemId: string) => {
        setCart(currentCart =>
            currentCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (itemId: string) => {
        setCart(currentCart => {
            const itemInCart = currentCart.find(item => item.id === itemId);

            if (itemInCart?.quantity === 1) {
                return currentCart.filter(item => item.id !== itemId);
            }
            else {
                return currentCart.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
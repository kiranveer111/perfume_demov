"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/data";

export type CartItem = Product & {
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
        setIsInitialized(true);
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }, [items, isInitialized]);

    const addToCart = (product: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

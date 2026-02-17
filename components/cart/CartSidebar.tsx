"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CartSidebar() {
    const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, cartTotal } = useCart();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    // Sync visibility with context but allow for animation time
    useEffect(() => {
        if (isCartOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
            document.body.style.overflow = "unset";
            return () => clearTimeout(timer);
        }
    }, [isCartOpen]);

    // Close cart when route changes
    useEffect(() => {
        if (isCartOpen) {
            toggleCart();
        }
    }, [pathname]);

    if (!isVisible && !isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={toggleCart}
            />

            {/* Sidebar */}
            <div
                className={`relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl dark:shadow-slate-950 flex flex-col transition-transform duration-300 ease-out transform ${isCartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                    <h2 className="text-xl font-serif font-medium flex items-center gap-2 text-slate-900 dark:text-slate-100">
                        <ShoppingBag size={20} />
                        Your Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500 dark:text-gray-400">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p>Your cart is empty.</p>
                            <Button variant="link" onClick={toggleCart} asChild>
                                <Link href="/products">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-md overflow-hidden shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-serif font-medium text-gray-900 dark:text-slate-100">{item.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.brand}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 rounded border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-200"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium w-6 text-center text-slate-900 dark:text-slate-100">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 rounded border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-200"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-900 dark:text-slate-100">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 space-y-4">
                        <div className="flex items-center justify-between text-lg font-medium text-slate-900 dark:text-slate-100">
                            <span className="font-serif">Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-center text-gray-400 dark:text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <Button
                            className="w-full py-6 text-lg"
                            variant="luxury"
                            onClick={toggleCart}
                            asChild
                        >
                            <Link href="/cart">
                                View Cart & Checkout <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

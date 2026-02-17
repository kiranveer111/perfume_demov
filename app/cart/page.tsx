"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const { data: session } = useSession();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-3xl font-serif mb-6">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't discovered your signature scent yet.</p>
                <Button asChild size="lg" variant="luxury">
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl font-serif mb-12">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-8">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-6 p-6 bg-white rounded-xl luxury-shadow">
                            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-serif font-medium">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.brand}</p>
                                        <p className="text-sm text-gray-400 mt-1">{item.category}</p>
                                    </div>
                                    <p className="text-lg font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <Button variant="ghost" className="text-red-500 hover:text-red-700" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-xl luxury-shadow sticky top-24">
                        <h2 className="text-xl font-serif mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-xl font-medium mb-8">
                            <span>Total</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>

                        <Button
                            className="w-full py-6 text-lg rounded-full"
                            variant="luxury"
                            asChild
                        >
                            <Link href={session ? "/checkout" : "/login?callbackUrl=/cart"}>
                                Checkout <ArrowRight className="ml-2" size={18} />
                            </Link>
                        </Button>

                        <p className="text-xs text-gray-400 text-center mt-4">
                            Secure Checkout. 100% Authentic Guarantee.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

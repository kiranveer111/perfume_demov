"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden luxury-shadow transition-all duration-300 hover:shadow-xl">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-primary transition-colors mb-2 block">
                        <Heart size={20} />
                    </button>
                </div>

                {/* Quick Add Button (Mobile/Desktop Hover) */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="w-full bg-white/90 backdrop-blur text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">{product.brand}</span>
                    <div className="flex items-center gap-1">
                        <Star size={14} className="fill-secondary text-secondary" />
                        <span className="text-xs font-semibold">{product.rating}</span>
                    </div>
                </div>

                <Link href={`/products/${product.id}`} className="block group-hover:text-gold transition-colors">
                    <h3 className="text-lg font-serif font-medium text-primary mb-1">{product.name}</h3>
                </Link>

                <p className="text-sm text-gray-500 mb-3 line-clamp-1">{product.category}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-semibold text-primary">₹{product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="md:hidden p-2 rounded-full bg-gray-100 text-primary"
                    >
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

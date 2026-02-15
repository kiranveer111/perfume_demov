"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/data";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Button
            onClick={handleAdd}
            size="xl"
            className="w-full rounded-full transition-all duration-300"
            variant={isAdded ? "gold" : "default"}
        >
            <ShoppingBag className="mr-2" size={20} />
            {isAdded ? "Added to Cart" : "Add to Cart"}
        </Button>
    );
}

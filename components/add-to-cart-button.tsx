"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Product } from "@/lib/data"

export function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart()

    return (
        <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => addToCart(product)}
            data-testid="add-to-cart-btn"
        >
            Add to Cart
        </Button>
    )
}

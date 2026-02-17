"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { Product } from "@/lib/data"
import { useState } from "react"

export function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta))
    }

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center border rounded-md w-fit">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none border-r"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    data-testid="decrease-quantity-btn"
                >
                    -
                </Button>
                <div className="w-12 text-center font-medium" data-testid="quantity-display">
                    {quantity}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none border-l"
                    onClick={() => handleQuantityChange(1)}
                    data-testid="increase-quantity-btn"
                >
                    +
                </Button>
            </div>
            <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => addToCart(product, quantity)}
                data-testid="add-to-cart-btn"
            >
                Add to Cart
            </Button>
        </div>
    )
}

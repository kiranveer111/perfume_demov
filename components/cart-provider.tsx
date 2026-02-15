"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Product } from "@/lib/data"
import { useSession } from "next-auth/react"

export interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Product) => Promise<void>
    removeFromCart: (productId: string) => Promise<void>
    updateQuantity: (productId: string, quantity: number) => Promise<void>
    clearCart: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()
    const [cart, setCart] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load cart - sync with DB if logged in, otherwise local storage
    useEffect(() => {
        const loadCart = async () => {
            if (session?.user) {
                try {
                    const res = await fetch('/api/cart')
                    if (res.ok) {
                        const data = await res.json()
                        // Map Order items to CartItems
                        if (data.items) {
                            const mappedItems: CartItem[] = data.items.map((item: any) => ({
                                id: item.product.id,
                                name: item.product.name,
                                price: item.product.price,
                                image: item.product.image,
                                category: item.product.category.name,
                                quantity: item.quantity
                            }))
                            setCart(mappedItems)
                        } else {
                            // If no active cart, set empty
                            setCart([])
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch cart", error)
                }
            } else {
                // Guest mode: Local Storage
                const savedCart = localStorage.getItem("cart")
                if (savedCart) {
                    try {
                        setCart(JSON.parse(savedCart))
                    } catch (e) {
                        console.error("Failed to parse cart", e)
                    }
                }
            }
            setIsLoaded(true)
        }

        loadCart()
    }, [session])

    // Save cart to local storage only if NOT logged in
    useEffect(() => {
        if (!session?.user && isLoaded) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart, session, isLoaded])

    const addToCart = async (product: Product) => {
        // Optimistic update
        const prevCart = [...cart]
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })

        if (session?.user) {
            try {
                await fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: product.id, quantity: 1 })
                })
            } catch (error) {
                console.error("Failed to sync cart", error)
                setCart(prevCart) // Revert on error
            }
        }
    }

    const removeFromCart = async (productId: string) => {
        const prevCart = [...cart]
        setCart((prev) => prev.filter((item) => item.id !== productId))

        if (session?.user) {
            try {
                await fetch(`/api/cart?productId=${productId}`, {
                    method: 'DELETE'
                })
            } catch (error) {
                console.error("Failed to remove item", error)
                setCart(prevCart)
            }
        }
    }

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity <= 0) {
            await removeFromCart(productId)
            return
        }

        const prevCart = [...cart]
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        )

        if (session?.user) {
            try {
                await fetch('/api/cart', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, quantity })
                })
            } catch (error) {
                console.error("Failed to update quantity", error)
                setCart(prevCart)
            }
        }
    }

    const clearCart = () => {
        setCart([])
        if (!session?.user) {
            localStorage.removeItem("cart")
        }
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

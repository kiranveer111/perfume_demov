"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function CheckoutPage() {
    const router = useRouter()
    const { cart, total, clearCart } = useCart()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
    })
    const [loading, setLoading] = useState(false)

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
                <Link href="/products">
                    <Button>Return to Shop</Button>
                </Link>
            </div>
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
            })

            if (res.ok) {
                clearCart()
                router.push("/checkout/success")
            } else {
                const text = await res.text()
                if (res.status === 401) {
                    // Redirect to login or show error
                    alert("Please log in to checkout")
                    router.push("/login")
                } else {
                    alert(text || "Checkout failed")
                }
            }
        } catch (error) {
            console.error("Checkout error:", error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8" data-testid="checkout-title">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                <Input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    data-testid="first-name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                <Input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    data-testid="last-name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                            <Input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                data-testid="address"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                <Input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    data-testid="city"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Zip Code</label>
                                <Input
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                    data-testid="zip-code"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t mt-6">
                            <h2 className="text-xl font-semibold mb-4">Payment Details (Mock)</h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                                <Input
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="0000 0000 0000 0000"
                                    data-testid="card-number"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div>
                    <div className="bg-slate-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4 mb-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span data-testid="total-price">₹{total.toFixed(2)}</span>
                        </div>

                        <Button
                            form="checkout-form"
                            type="submit"
                            className="w-full mt-6"
                            size="lg"
                            disabled={loading}
                            data-testid="place-order-btn"
                        >
                            {loading ? "Processing..." : "Place Order"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

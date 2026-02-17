"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function CheckoutPage() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { items: cart, cartTotal: total, clearCart } = useCart()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        paymentMethod: "card",
        upiId: "",
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/checkout")
        }
    }, [status, router])

    if (status === "loading" || !session) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-slate-600">Loading...</p>
            </div>
        )
    }

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    total,
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    address: formData.address.trim(),
                    city: formData.city.trim(),
                    zipCode: formData.zipCode.trim(),
                    paymentMethod: formData.paymentMethod,
                }),
            })

            if (res.ok) {
                clearCart()
                router.push("/checkout/success")
            } else {
                const text = await res.text()
                if (res.status === 401) {
                    router.push("/login?callbackUrl=/checkout")
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
                            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="card"
                                        name="paymentMethod"
                                        value="card"
                                        checked={formData.paymentMethod === "card"}
                                        onChange={handleChange}
                                        className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                                        data-testid="payment-card"
                                    />
                                    <label htmlFor="card" className="text-sm font-medium text-slate-700">Credit/Debit Card</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="cod"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleChange}
                                        className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                                        data-testid="payment-cod"
                                    />
                                    <label htmlFor="cod" className="text-sm font-medium text-slate-700">Cash on Delivery (COD)</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="upi"
                                        name="paymentMethod"
                                        value="upi"
                                        checked={formData.paymentMethod === "upi"}
                                        onChange={handleChange}
                                        className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                                        data-testid="payment-upi"
                                    />
                                    <label htmlFor="upi" className="text-sm font-medium text-slate-700">UPI</label>
                                </div>
                            </div>

                            {formData.paymentMethod === "card" && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Card Number (dummy)</label>
                                    <Input
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        placeholder="0000 0000 0000 0000"
                                        data-testid="card-number"
                                    />
                                </div>
                            )}

                            {formData.paymentMethod === "upi" && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">UPI ID (dummy)</label>
                                    <Input
                                        name="upiId"
                                        value={formData.upiId || ""}
                                        onChange={handleChange}
                                        placeholder="user@bank"
                                        data-testid="upi-id"
                                    />
                                </div>
                            )}
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

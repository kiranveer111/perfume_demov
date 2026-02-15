"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { useCart } from "@/components/cart-provider"

export function Navbar() {
    const { data: session } = useSession()
    const { cart } = useCart()
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <nav className="border-b bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold text-slate-900" data-testid="nav-logo">
                    EcoTest
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-slate-700 hover:text-blue-600" data-testid="nav-home">
                        Home
                    </Link>
                    <Link href="/products" className="text-sm font-medium text-slate-700 hover:text-blue-600" data-testid="nav-products">
                        Products
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-blue-600" data-testid="nav-about">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-blue-600" data-testid="nav-contact">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/cart" data-testid="nav-cart">
                        <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white" data-testid="cart-badge">
                                    {itemCount}
                                </span>
                            )}
                        </Button>
                    </Link>
                    {session ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-700">
                                {session.user?.name}
                            </span>
                            <Button variant="outline" size="sm" onClick={() => signOut()} data-testid="nav-logout">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login" data-testid="nav-login">
                            <Button variant="primary" size="sm">
                                <User className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

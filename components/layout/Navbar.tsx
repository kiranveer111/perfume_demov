"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { User, ShoppingBag, Menu, X, Search, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
                        ThePerfumeShop
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/products" className="text-sm font-medium hover:text-gold transition-colors">
                            Perfumes
                        </Link>
                        <Link href="/categories" className="text-sm font-medium hover:text-gold transition-colors">
                            Collections
                        </Link>
                        <Link href="/about" className="text-sm font-medium hover:text-gold transition-colors">
                            Our Story
                        </Link>
                        {session?.user && (
                            <Link href="/account" className="text-sm font-medium hover:text-gold transition-colors flex items-center gap-1.5">
                                <Package size={16} /> My Orders
                            </Link>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="hidden md:block hover:text-gold transition-colors">
                            <Search size={20} />
                        </button>
                        <Link href="/account" className="hidden md:flex items-center gap-2 hover:text-gold transition-colors">
                            <User size={20} />
                            {session?.user && <span className="text-sm font-medium">{session.user.name?.split(' ')[0]}</span>}
                        </Link>
                        <button
                            onClick={toggleCart}
                            className="relative hover:text-gold transition-colors"
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg py-6 px-4 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-4">
                    <Link
                        href="/products"
                        className="text-lg font-medium border-b pb-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Shop Perfumes
                    </Link>
                    <Link
                        href="/categories"
                        className="text-lg font-medium border-b pb-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Collections
                    </Link>
                    <Link
                        href="/about"
                        className="text-lg font-medium border-b pb-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Our Story
                    </Link>
                    <Link
                        href="/account"
                        className="text-lg font-medium border-b pb-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        My Account
                    </Link>
                    {session?.user && (
                        <Link
                            href="/account"
                            className="text-lg font-medium border-b pb-2 flex items-center gap-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Package size={18} /> My Orders
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}

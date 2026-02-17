"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, ShoppingBag, Menu, X, Search, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";

export function Navbar() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { cartCount, toggleCart } = useCart();
    const { data: session } = useSession();

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const q = searchQuery.trim();
        setIsSearchOpen(false);
        setSearchQuery("");
        if (q) {
            router.push(`/products?q=${encodeURIComponent(q)}`);
        } else {
            router.push("/products");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 text-slate-900 dark:text-slate-100 ${isScrolled
                ? "bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-4"
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
                        <div className="hidden md:block relative">
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen((open) => !open)}
                                className="hover:text-gold transition-colors"
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </button>
                            {isSearchOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        aria-hidden
                                        onClick={() => setIsSearchOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg p-3">
                                        <form onSubmit={handleSearchSubmit} className="flex gap-2">
                                            <Input
                                                ref={searchInputRef}
                                                type="search"
                                                placeholder="Search perfumes..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="flex-1"
                                                aria-label="Search"
                                            />
                                            <Button type="submit" variant="luxury" size="sm">
                                                Search
                                            </Button>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>
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
                <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg dark:shadow-slate-950/50 py-6 px-4 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-4 border-b dark:border-slate-800">
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 pb-4 border-b border-gray-200 dark:border-slate-700">
                        <Input
                            type="search"
                            placeholder="Search perfumes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                            aria-label="Search"
                        />
                        <Button type="submit" variant="luxury" size="sm">
                            Search
                        </Button>
                    </form>
                    <Link
                        href="/products"
                        className="text-lg font-medium border-b border-gray-200 dark:border-slate-700 pb-2 text-slate-900 dark:text-slate-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Shop Perfumes
                    </Link>
                    <Link
                        href="/categories"
                        className="text-lg font-medium border-b border-gray-200 dark:border-slate-700 pb-2 text-slate-900 dark:text-slate-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Collections
                    </Link>
                    <Link
                        href="/about"
                        className="text-lg font-medium border-b border-gray-200 dark:border-slate-700 pb-2 text-slate-900 dark:text-slate-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Our Story
                    </Link>
                    <Link
                        href="/account"
                        className="text-lg font-medium border-b border-gray-200 dark:border-slate-700 pb-2 text-slate-900 dark:text-slate-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        My Account
                    </Link>
                    {session?.user && (
                        <Link
                            href="/account"
                            className="text-lg font-medium border-b border-gray-200 dark:border-slate-700 pb-2 flex items-center gap-2 text-slate-900 dark:text-slate-100"
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

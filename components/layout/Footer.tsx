import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold tracking-tighter text-secondary">ThePerfumeShop</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Curating the world's finest fragrances. An olfactory journey of luxury and elegance.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-secondary">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/products?category=mens" className="hover:text-white transition-colors">Men's Perfumes</Link></li>
                            <li><Link href="/products?category=womens" className="hover:text-white transition-colors">Women's Perfumes</Link></li>
                            <li><Link href="/products?category=unisex" className="hover:text-white transition-colors">Unisex Collection</Link></li>
                            <li><Link href="/products?category=gift-sets" className="hover:text-white transition-colors">Gift Sets</Link></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-secondary">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4 text-secondary">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-secondary flex-1"
                            />
                            <Button variant="gold" size="sm">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} ThePerfumeShop. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="#" className="text-gray-400 hover:text-secondary transition-colors"><Facebook size={18} /></Link>
                        <Link href="#" className="text-gray-400 hover:text-secondary transition-colors"><Instagram size={18} /></Link>
                        <Link href="#" className="text-gray-400 hover:text-secondary transition-colors"><Twitter size={18} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

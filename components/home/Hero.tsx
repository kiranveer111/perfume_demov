"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
            {/* Background - Elegant dark image or video could go here */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1585218334450-afcf929da36e?q=80&w=1600&auto=format&fit=crop"
                    alt="Luxury Perfume"
                    fill
                    className="object-cover object-center brightness-50"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <span className="block text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">Exquisite Fragrances</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 drop-shadow-md">
                    Discover Your <br />
                    <span className="italic text-secondary">Signature Scent</span>
                </h1>
                <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-200 mb-10 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 drop-shadow-sm">
                    Immerse yourself in a world of olfactory elegance. Handcrafted perfumes designed to evoke emotion and memory.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                    <Button asChild size="xl" variant="gold" className="rounded-full px-10">
                        <Link href="/products">Shop Now</Link>
                    </Button>
                    <Button asChild size="xl" variant="luxuryOutline" className="rounded-full px-10 border-white text-white hover:bg-white hover:text-black">
                        <Link href="/about">Our Story</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

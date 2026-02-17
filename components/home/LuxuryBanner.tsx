import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LuxuryBanner() {
    return (
        <section className="relative py-32 bg-primary dark:bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white dark:text-slate-100 mb-6">
                    The <span className="text-secondary italic">Golden</span> Hour
                </h2>
                <p className="max-w-2xl mx-auto text-gray-300 dark:text-gray-300 text-lg mb-10 leading-relaxed font-light">
                    Experience the pinnacle of luxury with our limited edition Gold Collection.
                    Rare ingredients, exquisite craftsmanship, and timeless elegance.
                </p>
                <Button asChild size="xl" variant="gold" className="rounded-full px-12">
                    <Link href="/products?collection=luxury">Explore Collection</Link>
                </Button>
            </div>
        </section>
    );
}

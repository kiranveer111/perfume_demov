import { categories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Collections</h1>
                <p className="text-gray-500 text-lg font-light leading-relaxed">
                    Explore our diverse range of fragrances, each crafted to tell a unique story. From the depths of oud to the lightness of floral bouquets.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/products?category=${category.slug}`}
                        className="group block"
                    >
                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-6 luxury-shadow">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-serif text-primary group-hover:text-gold transition-colors">{category.name}</h2>
                            <span className="text-sm text-gray-500 mt-2 inline-block uppercase tracking-widest border-b border-transparent group-hover:border-gold pb-1 transition-all">
                                Explore Collection
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

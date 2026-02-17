import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export function FeaturedCategories() {
    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-slate-900 dark:text-slate-100 animate-in fade-in slide-in-from-bottom-4">
                    Curated Collections
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <Link
                            key={category.slug}
                            href={`/products?category=${category.slug}`}
                            className="group relative overflow-hidden rounded-lg aspect-[4/3] block luxury-shadow bg-gray-900"
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-2xl font-serif text-white border-b-2 border-transparent group-hover:border-secondary transition-all duration-300 pb-1">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

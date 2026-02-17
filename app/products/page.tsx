import { ProductCard } from "@/components/ui/ProductCard";
import { products, categories } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define searchParams type for Next.js 15+ (async)
interface ProductsPageProps {
    searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const { category: selectedCategory, q: searchQuery } = await searchParams;

    // Filter products
    // Map friendly slug to actual category string in data
    let filterCategory = '';
    if (selectedCategory === 'mens') filterCategory = "Men's Perfumes";
    else if (selectedCategory === 'womens') filterCategory = "Women's Perfumes";
    else if (selectedCategory === 'unisex') filterCategory = "Unisex Perfumes";
    else if (selectedCategory === 'luxury') filterCategory = "Luxury Collection";
    else if (selectedCategory === 'gifts') filterCategory = "Gift Sets";
    else if (selectedCategory === 'oud') filterCategory = "Oud Collection";

    let filteredProducts = selectedCategory
        ? products.filter(p => p.category === filterCategory || p.category.toLowerCase().includes(selectedCategory.toLowerCase()))
        : products;

    // Text search: filter by name, brand, category, or description
    if (searchQuery?.trim()) {
        const q = searchQuery.trim().toLowerCase();
        filteredProducts = filteredProducts.filter(
            p =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-serif font-medium mb-4 text-primary dark:text-slate-100">
                        {searchQuery?.trim()
                            ? `Search: "${searchQuery}"`
                            : selectedCategory
                                ? categories.find(c => c.slug === selectedCategory)?.name || "Collection"
                                : "All Perfumes"}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Showing {filteredProducts.length} results
                    </p>
                </div>

                {/* Simple Sort/Filter (Visual only for now or could link) */}
                <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0">
                    <Link href="/products">
                        <Button
                            variant={!selectedCategory ? "luxury" : "outline"}
                            size="sm"
                        >
                            All
                        </Button>
                    </Link>
                    {categories.map(cat => (
                        <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
                            <Button
                                variant={selectedCategory === cat.slug ? "luxury" : "outline"}
                                size="sm"
                                className="whitespace-nowrap"
                            >
                                {cat.name}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        {searchQuery?.trim() ? `No perfumes found for "${searchQuery}".` : "No perfumes found in this collection."}
                    </p>
                    <Link href="/products" className="mt-4 inline-block text-primary dark:text-amber-400 underline hover:no-underline">View all perfumes</Link>
                </div>
            )}
        </div>
    );
}

import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/data";

export function BestSellers() {
    // Filter best sellers from mock data
    const bestSellers = products.filter(p => p.tags?.includes("Best Seller")).slice(0, 4);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <span className="text-sm uppercase tracking-widest text-gray-500 mb-2 block">Customer Favorites</span>
                    <h2 className="text-3xl md:text-4xl font-serif">Best Sellers</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

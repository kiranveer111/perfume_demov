import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Star, Truck, ShieldCheck, Heart } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    // Related products
    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
                {/* Product Image */}
                <div className="relative aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-center">
                    <div className="mb-2">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">{product.brand}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className={i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-gray-300"}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.rating} / 5.0)</span>
                    </div>

                    <div className="text-3xl font-medium text-primary mb-8">
                        ₹{product.price.toFixed(2)}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
                        {product.description}
                        <br /><br />
                        Enhance your presence with this sophisticated blend. Long-lasting and memorable, it is the perfect addition to your daily ritual or special occasions.
                    </p>

                    <div className="flex gap-4 mb-10">
                        <div className="flex-1">
                            <AddToCartButton product={product} />
                        </div>
                        <Button variant="outline" size="xl" className="aspect-square p-0 w-12 h-12 flex items-center justify-center rounded-full">
                            <Heart size={20} />
                        </Button>
                    </div>

                    <div className="border-t border-gray-100 pt-8 space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <Truck size={18} />
                            <span>Free shipping on orders over $150</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <ShieldCheck size={18} />
                            <span>Authenticity Guaranteed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

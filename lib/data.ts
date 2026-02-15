export type Product = {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    description: string;
    tags?: string[];
}

export const products: Product[] = [
    {
        id: "1",
        name: "Midnight Oud",
        brand: "L'Essence",
        category: "Oud Collection",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1585218334450-afcf929da36e?q=80&w=1000&auto=format&fit=crop",
        rating: 4.8,
        description: "A deep, resinous scent with notes of rose, oud, and amber. Perfect for evening wear.",
        tags: ["Best Seller", "Unisex"]
    },
    {
        id: "2",
        name: "Ethereal Bloom",
        brand: "L'Essence",
        category: "Women's Perfumes",
        price: 89.50,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
        rating: 4.6,
        description: "Light floral notes of jasmine and lily of the valley with a hint of white musk.",
        tags: ["New Arrival"]
    },
    {
        id: "3",
        name: "Noir Intense",
        brand: "L'Essence",
        category: "Men's Perfumes",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop",
        rating: 4.7,
        description: "A spicy, woody fragrance with leather accords and tobacco leaf.",
        tags: ["Best Seller"]
    },
    {
        id: "4",
        name: "Golden Amber",
        brand: "L'Essence",
        category: "Luxury Collection",
        price: 185.00,
        image: "https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?q=80&w=1000&auto=format&fit=crop",
        rating: 4.9,
        description: "An opulent blend of golden amber, vanilla bean, and sandalwood.",
        tags: ["Luxury"]
    },
    {
        id: "5",
        name: "Oceanic Drift",
        brand: "L'Essence",
        category: "Men's Perfumes",
        price: 78.00,
        image: "https://images.unsplash.com/photo-1615160460366-2c9a41771b51?q=80&w=1000&auto=format&fit=crop",
        rating: 4.4,
        description: "Fresh sea salt, bergamot, and cedarwood capturing the essence of the ocean.",
        tags: []
    },
    {
        id: "6",
        name: "Rose Éclat",
        brand: "L'Essence",
        category: "Women's Perfumes",
        price: 110.00,
        image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=1000&auto=format&fit=crop",
        rating: 4.5,
        description: "A vibrant bouquet of damask rose, peony, and fruit accents.",
        tags: ["Gift Set"]
    },
    {
        id: "7",
        name: "Vanilla Silk",
        brand: "L'Essence",
        category: "Unisex Perfumes",
        price: 92.00,
        image: "https://images.unsplash.com/photo-1708486855543-6010a133280f?q=80&w=1000&auto=format&fit=crop",
        rating: 4.7,
        description: "Smooth Madagascar vanilla with subtle hints of orchid and tonka bean.",
        tags: ["Best Seller"]
    },
    {
        id: "8",
        name: "Saffron Spice",
        brand: "L'Essence",
        category: "Luxury Collection",
        price: 210.00,
        image: "https://images.unsplash.com/photo-1610113233329-1c73b6f7fe98?q=80&w=1000&auto=format&fit=crop",
        rating: 5.0,
        description: "Exotic saffron, leather, and smoked oud for a truly unique signature scent.",
        tags: ["Luxury", "New Arrival"]
    }
];

export const categories = [
    { name: "Men's Perfumes", image: "https://images.unsplash.com/photo-1615160460366-2c9a41771b51?q=80&w=1000&auto=format&fit=crop", slug: "mens" },
    { name: "Women's Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop", slug: "womens" },
    { name: "Unisex Perfumes", image: "https://images.unsplash.com/photo-1708486855543-6010a133280f?q=80&w=1000&auto=format&fit=crop", slug: "unisex" },
    { name: "Luxury Collection", image: "https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?q=80&w=1000&auto=format&fit=crop", slug: "luxury" },
    { name: "Gift Sets", image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=1000&auto=format&fit=crop", slug: "gifts" },
    { name: "Oud Collection", image: "https://images.unsplash.com/photo-1585218334450-afcf929da36e?q=80&w=1000&auto=format&fit=crop", slug: "oud" },
];

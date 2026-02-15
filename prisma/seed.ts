import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Toys',
    'Books',
    'Automotive',
    'Health & Beauty'
]

const adjectives = ['Premium', 'Wireless', 'Ergonomic', 'Durable', 'Smart', 'Compact', 'Luxury', 'Essential', 'High-Performance', 'Sleek']
const nouns = ['Headphones', 'Chair', 'Watch', 'Shoes', 'Keyboard', 'Bag', 'Monitor', 'Desk', 'Lamp', 'Speaker', 'Camera', 'Phone', 'Laptop', 'Tablet']

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

function getRandomPrice(min: number, max: number): number {
    return Number((Math.random() * (max - min) + min).toFixed(2))
}

async function main() {
    console.log('Start seeding ...')

    // Clear existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()

    // Create Specific Categories matching lib/data.ts
    const categoryData = [
        { name: "Men's Perfumes", slug: "mens" },
        { name: "Women's Perfumes", slug: "womens" },
        { name: "Unisex Perfumes", slug: "unisex" },
        { name: "Luxury Collection", slug: "luxury" },
        { name: "Gift Sets", slug: "gifts" },
        { name: "Oud Collection", slug: "oud" },
    ]

    const categoryMap = new Map();

    for (const cat of categoryData) {
        const created = await prisma.category.create({
            data: { name: cat.name }
        })
        categoryMap.set(cat.name, created.id)
    }

    console.log(`Created ${categoryData.length} categories.`)

    // Create Specific Products matching lib/data.ts with FIXED IDs
    const products = [
        {
            id: "1",
            name: "Midnight Oud",
            brand: "L'Essence",
            category: "Oud Collection",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1585218334450-afcf929da36e?q=80&w=1000&auto=format&fit=crop",
            rating: 4.8,
            description: "A deep, resinous scent with notes of rose, oud, and amber. Perfect for evening wear.",
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
        }
    ];

    for (const p of products) {
        await prisma.product.create({
            data: {
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
                image: p.image,
                categoryId: categoryMap.get(p.category)
            }
        })
    }

    console.log(`Created ${products.length} products with fixed IDs.`)

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

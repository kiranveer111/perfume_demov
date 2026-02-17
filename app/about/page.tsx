export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
                <span className="text-sm uppercase tracking-widest text-gold mb-4 block">Our Story</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-10 leading-tight">
                    Crafting Memories through <span className="italic">Scent</span>
                </h1>
                <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                    ThePerfumeShop was born from a passion for the evocative power of fragrance. We believe that a perfume is not just an accessory, but a personal signature that lingers in memory long after you've left the room.
                </p>
                <div className="h-px w-24 bg-gold mx-auto mb-12" />
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Our perfumes are meticulously blended using the finest ingredients sourced from around the globe. Rare ouds from the East, delicate jasmines from Grasse, and earthy vetivers from Haiti come together in our atelier to create scents that adhere to the highest standards of luxury perfumery.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Sustainability and ethics are at the heart of our craft. We work directly with growers to ensure fair practices and use eco-conscious packaging that reflects the precious nature of the contents within.
                </p>
            </div>
        </div>
    );
}

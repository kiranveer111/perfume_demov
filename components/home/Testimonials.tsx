import { Star } from "lucide-react";

export function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Sophia L.",
            text: "ThePerfumeShop has completely transformed my fragrance collection. The Midnight Oud is simply divine.",
            rating: 5,
        },
        {
            id: 2,
            name: "James M.",
            text: "Exceptional quality and packaging. It feels like unboxing a treasure. Highly recommended.",
            rating: 5,
        },
        {
            id: 3,
            name: "Elena R.",
            text: "The customer service is as premium as the perfumes. I found my signature scent thanks to their guide.",
            rating: 5,
        },
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-serif mb-12 text-slate-900 dark:text-slate-100">What Our Clients Say</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="p-8 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:shadow-lg dark:hover:shadow-slate-950/50 transition-shadow duration-300 border border-transparent dark:border-slate-700">
                            <div className="flex justify-center mb-4 space-x-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-secondary text-secondary" />
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{testimonial.text}"</p>
                            <h4 className="font-semibold text-primary dark:text-slate-200">— {testimonial.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
    title: "Contact Us - Next.js E-Commerce Tester",
    description: "Get in touch with us.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-4xl font-bold mb-8 text-slate-900" data-testid="contact-title">Contact Us</h1>

            <p className="text-lg text-slate-600 mb-8">
                Have questions about this testing sandbox? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form className="space-y-6" data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Name
                        </label>
                        <Input id="name" placeholder="John Doe" required data-testid="contact-name" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                        </label>
                        <Input id="email" type="email" placeholder="john@example.com" required data-testid="contact-email" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" required data-testid="contact-subject" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Message
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        className="min-h-[150px]"
                        required
                        data-testid="contact-message"
                    />
                </div>

                <Button type="submit" className="w-full md:w-auto" data-testid="contact-submit">
                    Send Message
                </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
                <div className="space-y-2 text-slate-600">
                    <p><strong>Email:</strong> support@ecommercetester.in</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Address:</strong> 123 Tech Park, Electronic City, Bangalore, Karnataka 560100, India</p>
                </div>
            </div>
        </div>
    );
}

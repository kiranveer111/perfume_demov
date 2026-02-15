import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <div className="flex justify-center mb-6">
                <CheckCircle className="h-24 w-24 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4" data-testid="success-title">Order Placed Successfully!</h1>
            <p className="text-xl text-slate-600 mb-8" data-testid="success-message">
                Thank you for your purchase. Your order has been confirmed.
            </p>
            <Link href="/products">
                <Button size="lg" data-testid="continue-shopping">Continue Shopping</Button>
            </Link>
        </div>
    )
}

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json().catch(() => ({}))
    const { items, total, firstName, lastName, address, city, zipCode, paymentMethod } = body

    if (!items || items.length === 0) {
        return new NextResponse("No items in checkout", { status: 400 })
    }

    if (!firstName?.trim() || !lastName?.trim() || !address?.trim() || !city?.trim() || !zipCode?.trim()) {
        return new NextResponse("Shipping address is required (first name, last name, address, city, zip code)", { status: 400 })
    }

    if (!paymentMethod?.trim()) {
        return new NextResponse("Please select a payment method", { status: 400 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const order = await prisma.order.create({
            data: {
                userId: user.id,
                total: total,
                status: "processing",
                shippingAddress: `${String(firstName).trim()} ${String(lastName).trim()}, ${String(address).trim()}`,
                city: String(city).trim(),
                zipCode: String(zipCode).trim(),
                paymentMethod: String(paymentMethod).trim(),
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error("[CHECKOUT_ERROR]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

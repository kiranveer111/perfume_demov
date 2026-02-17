import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const { items, total, firstName, lastName, address, city, zipCode, paymentMethod } = await req.json()

    if (!items || items.length === 0) {
        return new NextResponse("No items in checkout", { status: 400 })
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
                shippingAddress: `${firstName} ${lastName}, ${address}`,
                city: city,
                zipCode: zipCode,
                paymentMethod: paymentMethod,
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

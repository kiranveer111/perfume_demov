import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

// GET: Fetch current user's cart
export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                orders: {
                    where: { status: "cart" },
                    include: {
                        items: {
                            include: {
                                product: {
                                    include: {
                                        category: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        const cartOrder = user?.orders[0]

        if (!cartOrder) {
            return NextResponse.json({ items: [] })
        }

        return NextResponse.json(cartOrder)
    } catch (error) {
        console.error("Failed to fetch cart:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// POST: Add item to cart
export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await request.json()
        const { productId, quantity } = body

        if (!productId || !quantity) {
            return new NextResponse("Missing fields", { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        // Find or create cart order
        let cartOrder = await prisma.order.findFirst({
            where: {
                userId: user.id,
                status: "cart"
            },
            include: { items: true }
        })

        if (!cartOrder) {
            cartOrder = await prisma.order.create({
                data: {
                    userId: user.id,
                    status: "cart",
                    total: 0
                },
                include: { items: true }
            })
        }

        // Check if item already exists in cart
        const existingItem = cartOrder.items.find((item: any) => item.productId === productId)

        const product = await prisma.product.findUnique({
            where: { id: productId }
        })

        if (!product) {
            return new NextResponse("Product not found", { status: 404 })
        }

        if (existingItem) {
            // Update quantity
            await prisma.orderItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + quantity
                }
            })
        } else {
            // Create new item
            await prisma.orderItem.create({
                data: {
                    orderId: cartOrder.id,
                    productId,
                    quantity,
                    price: product.price // Snapshot price at time of adding
                }
            })
        }

        // Recalculate total (simplified)
        // In a real app we might do this via DB aggregation or hooks

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error("Failed to add to cart:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// PUT: Update item quantity
export async function PUT(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await request.json()
        const { productId, quantity } = body

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) return new NextResponse("User not found", { status: 404 })

        const cartOrder = await prisma.order.findFirst({
            where: { userId: user.id, status: "cart" },
            include: { items: true }
        })

        if (!cartOrder) return new NextResponse("Cart not found", { status: 404 })

        const existingItem = cartOrder.items.find(item => item.productId === productId)

        if (existingItem) {
            if (quantity > 0) {
                await prisma.orderItem.update({
                    where: { id: existingItem.id },
                    data: { quantity }
                })
            } else {
                // Remove if quantity is 0 or less
                await prisma.orderItem.delete({
                    where: { id: existingItem.id }
                })
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// DELETE: Remove item
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const { searchParams } = new URL(request.url)
        const productId = searchParams.get('productId')

        if (!productId) return new NextResponse("Missing productId", { status: 400 })

        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) return new NextResponse("User not found", { status: 404 })

        const cartOrder = await prisma.order.findFirst({
            where: { userId: user.id, status: "cart" },
            include: { items: true }
        })

        if (!cartOrder) return new NextResponse("Cart not found", { status: 404 })

        const existingItem = cartOrder.items.find(item => item.productId === productId)

        if (existingItem) {
            await prisma.orderItem.delete({ where: { id: existingItem.id } })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

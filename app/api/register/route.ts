import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

function jsonError(message: string, status: number) {
    return NextResponse.json({ error: message }, { status })
}

export async function POST(request: Request) {
    try {
        let body: Record<string, unknown>
        try {
            body = await request.json()
        } catch {
            return jsonError("Invalid request body", 400)
        }

        const { firstName, lastName, email, password } = body as {
            firstName?: string
            lastName?: string
            email?: string
            password?: string
        }

        if (!firstName || !lastName || !email || !password) {
            return jsonError("Please fill in all fields (first name, last name, email, password).", 400)
        }

        const trimmedEmail = email.trim().toLowerCase()
        if (!trimmedEmail) {
            return jsonError("Email is required.", 400)
        }

        const exist = await prisma.user.findUnique({
            where: { email: trimmedEmail }
        })

        if (exist) {
            return jsonError("An account with this email already exists.", 400)
        }

        if (password.length < 6) {
            return jsonError("Password must be at least 6 characters.", 400)
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name: `${String(firstName).trim()} ${String(lastName).trim()}`,
                email: trimmedEmail,
                password: hashedPassword
            }
        })

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error("[register]", error)
        const message = error instanceof Error ? error.message : "Registration failed"
        return NextResponse.json(
            { error: process.env.NODE_ENV === "development" ? message : "Registration failed. Please try again." },
            { status: 500 }
        )
    }
}

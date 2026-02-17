"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }
        setError("")

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password
                })
            })

            const text = await res.text()
            let data: { error?: string; message?: string } = {}
            try {
                data = text ? JSON.parse(text) : {}
            } catch {
                data = { error: text || "Registration failed" }
            }
            const errorMessage = typeof data?.error === "string" ? data.error : (data?.message || "Registration failed")

            if (res.ok) {
                router.push("/login")
                router.refresh()
            } else {
                setError(errorMessage)
            }
        } catch (err) {
            console.error("Registration failed", err)
            setError("Network error. Please check your connection and try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100" data-testid="register-title">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-blue-600 dark:text-amber-400 hover:text-blue-500 dark:hover:text-amber-300" data-testid="login-link">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleRegister} data-testid="register-form">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="sr-only">First Name</label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                data-testid="first-name-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="sr-only">Last Name</label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                data-testid="last-name-input"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            data-testid="email-input"
                        />
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 px-3 py-2 text-sm text-red-700 dark:text-red-400" data-testid="register-error">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            data-testid="password-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            data-testid="confirm-password-input"
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="luxury"
                            className="w-full"
                            disabled={loading}
                            data-testid="register-submit"
                        >
                            {loading ? "Creating account..." : "Register"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

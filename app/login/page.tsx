"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                setError("Invalid email or password")
            } else {
                router.push("/products")
                router.refresh()
            }
        } catch (error) {
            console.error("Login failed", error)
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100" data-testid="login-title">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Or{" "}
                        <Link href="/register" className="font-medium text-blue-600 dark:text-amber-400 hover:text-blue-500 dark:hover:text-amber-300" data-testid="register-link">
                            create a new account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin} data-testid="login-form">
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                data-testid="email-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                data-testid="password-input"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 p-2 rounded" data-testid="error-message">
                            {error}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            variant="luxury"
                            className="w-full"
                            disabled={loading}
                            data-testid="login-submit"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>

                    <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                        <p>Hint: user@example.com / password</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

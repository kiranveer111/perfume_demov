import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, User as UserIcon, LogOut } from "lucide-react";
import SignOutButton from "@/components/ui/SignOutButton"; // We'll create this client component

export default async function AccountPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            orders: {
                orderBy: { createdAt: 'desc' },
                include: {
                    items: {
                        include: { product: true }
                    }
                }
            }
        }
    });

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-serif">My Account</h1>
                    <SignOutButton />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-2xl luxury-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <UserIcon size={24} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-lg">{user.name || "User"}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm">
                                    <span className="text-gray-500 block mb-1">Member since</span>
                                    <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full mt-6" asChild>
                                <Link href="/account/edit">Edit Profile</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Orders */}
                    <div className="md:col-span-2">
                        <div className="bg-white p-6 rounded-2xl luxury-shadow min-h-[400px]">
                            <h2 className="text-xl font-serif mb-2 flex items-center gap-2">
                                <Package size={20} /> Order History
                            </h2>
                            <p className="text-sm text-gray-500 mb-6">Manage and track your orders</p>

                            {user.orders.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <p>You haven't placed any orders yet.</p>
                                    <Button variant="link" asChild className="mt-2 text-primary">
                                        <Link href="/products">Start Shopping</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {user.orders.map(order => (
                                        <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                                            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-50">
                                                <div>
                                                    <p className="font-medium">Order #{order.id.slice(-6).toUpperCase()}</p>
                                                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">₹{Number(order.total).toFixed(2)}</p>
                                                    <span className={`inline-block px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {order.items.map(item => (
                                                    <div key={item.id} className="flex justify-between text-sm">
                                                        <span className="text-gray-600 flex-1 truncate pr-4">
                                                            {item.quantity}x {item.product.name}
                                                        </span>
                                                        <span>₹{Number(item.price).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

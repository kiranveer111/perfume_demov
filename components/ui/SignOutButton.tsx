"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-gray-500 hover:text-red-500"
        >
            <LogOut size={16} className="mr-2" />
            Sign Out
        </Button>
    );
}

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import useUser from "@/hook/useUser";
import { createClient } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Session } from "@supabase/supabase-js";

function Profile() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data: user, isLoading } = useUser();
    
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                throw new Error(error.message);
            }
            setSession(data?.session || null);
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        const supabase = createClient();
        supabase.auth.signOut();
        queryClient.clear();
        router.refresh();
    };

    if (isLoading) {
        return <></>;
    }

    return (
        <div className="border border-white rounded-full px-4 py-1">
            {!user?.id ? (
                <Link href={"/login"}>
                    <Button variant={"outline"}>Sign In</Button>
                </Link>
            ) : (
                <div className="flex items-center flex-row gap-4">
                    <h1 className="text-sm">{user.email}</h1>
                    <LogOut size={18} onClick={handleLogout} />
                </div>
            )}
        </div>
    );
}

export default Profile;

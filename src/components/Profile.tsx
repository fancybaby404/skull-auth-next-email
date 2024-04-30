"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import useUser from "@/hook/useUser";
import { createClient } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

function Profile() {
    const router = useRouter();
    const {data, isFetching} = useUser();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        const supabase = createClient();
        supabase.auth.signOut();
        queryClient.clear();
        router.refresh();
    };

    if (isFetching) {
        return <></>;
    }

    return (
        <div>
            {!data?.id ? (
                <Link href={"/auth"}>
                    <Button variant={"outline"}>Sign In</Button>
                </Link>
            ) : (
                <div className="flex items-center flex-row gap-4">
                    <h1>{data.email}</h1>
                    <LogOut onClick={handleLogout} />
                </div>
            )}
        </div>
    );
}

export default Profile;

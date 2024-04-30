"use client";

import { createClient } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
    return useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const supabase = createClient();
            const session = supabase.auth.getSession();
            return session;
        },
    });
};

"use client";

import { createClient } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

const initUser = {
    created_at: "",
    email: "",
    id: "",
    website_settings: {
        mainText: "",
        subText: "",
        socials: {
            tiktok: "",
            youtube: "",
            facebook: "",
            instagram: "",
            twitter: "",
            shopee: "",
            lazada: "",
        },
    },
};

export default function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getSession();

            if (error) {
                throw new Error(error.message);
            }

            if (data.session?.user) {
                // fetch user information [settings] table
                const { data: user } = await supabase
                    .from("settings")
                    .select("*")
                    .eq("id", data.session.user.id)
                    .single();
                return user;
            }
            return initUser;
        },


        
    });
}

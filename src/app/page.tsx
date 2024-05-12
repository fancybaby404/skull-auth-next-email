"use client"

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browser";
import { Github, KeyRound } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function Home() {

    return (
        <div className="flex flex-col my-2 mx-2">
            <h1 className="text-sm text-center">boilerplate for <span className="text-yellow-400 underline">sign-in</span></h1>
            <p className="text-center text-xs"></p>
        </div>
    );
}

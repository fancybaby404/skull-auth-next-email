"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Skull } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email",
    }),
    password: z
        .string()
        .min(8, {
            message: "Please enter a valid password",
        })
        .max(255),
});

function Auth() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // attempt login
        const supabase = createClient();
        supabase.auth
            .signInWithPassword({
                email: values.email,
                password: values.password,
            })
            .then((e) => {
                const session = e.data.session;
                if (session) {
                    router.refresh();
                    toast({
                        title: "Success",
                        description: "You have successfully logged in",
                    });
                    queryClient.invalidateQueries({ queryKey: ["user"] });
                    router.push("/");
                } else {
                    toast({
                        title: "Error",
                        description: "Something went wrong",
                        variant: "destructive",
                    });
                }
            });
    };

    return (
        <div className="flex flex-row gap-8 items-center justify-between w-full h-[80vh]">
            <div className="flex justify-center items-center">
                <Skull size={420}/>

            </div>
            <div className="w-96 h-96 rounded-md border p-5 space-y-8 shadow-2xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="..."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="..."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center flex-col gap-2">
                            <Button type="submit">Log in</Button>
                            <p className="text-xs self-center text-gray-200">Don&apos;t have an account? <Link className="text-white font-medium" href="/signup">Sign up</Link></p>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Auth;

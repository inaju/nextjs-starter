"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import useGetScrollDirection from "@/hooks/useGetScrollDirection"
import { Edit } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { Textarea } from '../ui/textarea'
import Visible from "./visible"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/router"
import { ToastAction } from "../ui/toast"



const Ask = ({ mutation }) => {
    const { data: session, ...rest } = useSession()
    const [showTextArea, setShowTextArea] = useState(false)
    const { scrollDir } = useGetScrollDirection()
    const router = useRouter();
    const formSchema = z.object({
        question: z.string().min(2, {
            message: "question must be at least 2 characters.",
        }),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: "",
        },
    })
    function onSubmit(values) {
        if (!session) return toast({
            variant: "destructive",
            title: "It seems you're not logged in",
            description: "please login",
            action: <ToastAction altText="Login" onClick={() => router.push("/auth/login")}>Login</ToastAction>,

        });
        mutation.mutate({
            title: values?.question,
            user: session?.user,
            userId: session?.user?.id,
        })
        form?.reset()
    }

    useEffect(() => {
        if (showTextArea) {
            if (scrollDir == "scrolling down") {
                setShowTextArea(false)
            }
        }
    }, [scrollDir, showTextArea])
    const inputElement = useRef(null);
    useEffect(() => {
        inputElement.current?.focus();
    }, []);
    return (
        <div className="bg-inherit z-10 relative">
            <Visible when={showTextArea} otherwise={
                <div onClick={() => setShowTextArea(true)} className=" flex justify-between items-center px-4 py-2 rounded-lg border hover:bg-slate-200 hover:text-primary cursor-pointer text-muted-foreground">
                    I have a question about...
                    <Edit size={18} className="hover:text-primary" />
                </div>
            }>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white p-2 rounded-md">
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>I have a question about...</FormLabel>
                                    <FormControl>
                                        <Textarea innerRef={inputElement} placeholder="Ask your question here." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-4 ">

                            <Button
                                disabled={mutation?.isPending}
                                type="submit">
                                {mutation?.isPending ? "loading..." : "Send !"}
                            </Button>
                            <div onClick={() => setShowTextArea(false)} className="cursor-pointer text-muted-foreground hover:text-primary">
                                Close
                            </div>
                        </div>
                    </form>
                </Form>
            </Visible>

        </div>
    )
}

export default Ask

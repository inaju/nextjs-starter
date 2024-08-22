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
import { Textarea } from '../ui/textarea'
const Ask = ({ postTodos, mutation }) => {

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
        mutation.mutate({
            title: values?.question
        })
        form?.reset()
    }
    return (
        <div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>I have a question about...</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Ask your question here." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {mutation?.isPending ? "loading..." : "Send !"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Ask

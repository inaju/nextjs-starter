import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getEvent, getSingleEvent, getTodos, likeTodo, postEvent, postTodos } from "@/services";
import {
    useMutation,
    useQuery,
    useQueryClient
} from '@tanstack/react-query';
import { useRouter } from "next/router";
import { useState } from "react";

export const useHandleEvent = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const { error, data, isLoading } = useQuery({ queryKey: ['event'], queryFn: getEvent })
    const [updatedResponse, setUpdatedResponse] = useState(data)
    const [singleResponse, setSingleResponse] = useState({})
    const router=useRouter()
    const mutation = useMutation({
        mutationFn: postEvent,
        onSuccess: ({ ...rest }) => {
            if (rest?.data) {
                setSingleResponse({})
                toast({
                    title: "yooo!",
                    description: 'Event Created',
                })
                queryClient.invalidateQueries({ queryKey: ['event'] })
                setSingleResponse(rest?.data)
                console.log(rest?.data?.eventId,'rest?.data?.eventId')
                router.push("/event/" + rest?.data?.eventId)
                return rest?.data;
            }
            if (rest.response.status == 400) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: rest?.response?.data?.message,
                })
            }
        },
    })
    const getSingleEventFunc = useMutation({
        mutationFn: (data) => getSingleEvent(data),
        onSuccess: ({ ...rest }) => {
            if (rest?.data) {
                queryClient.invalidateQueries({ queryKey: ['event'] })
                setSingleResponse(rest.data)
            }
            if (rest.response.status == 400) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: rest?.response?.data?.message,
                })
            }
        },
    })


    return {
        getSingleEventFunc, singleResponse,
        error, data, updatedResponse, mutation,
    }
}
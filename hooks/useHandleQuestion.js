import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getTodos, likeTodo, postTodos } from "@/services";
import {
    useMutation,
    useQuery,
    useQueryClient
} from '@tanstack/react-query';

export const useHandleQuestion=()=>{
    const { toast } = useToast()

    const queryClient = useQueryClient()
    const { isPending, error, data, isFetching } = useQuery({ queryKey: ['todos'], queryFn: getTodos })
    const likeQuestionMutation = useMutation({
      mutationFn: likeTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
        queryClient.invalidateQueries({ queryKey: ['todos'] })
        toast({
            title: "Sweetttt!",
            description: 'Question Liked',
          })
      },
    })
    const mutation = useMutation({
      mutationFn: postTodos,
      onError: (error, variables, context) => {
        console.log(error?.message, 'dataaa')
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message,
        //   action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      },
      onSuccess: ({ ...rest }) => {
        toast({
          title: "yooo!",
          description: 'Question posted',
        })
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
    })
  
  
    return {
        isPending, error, data, isFetching ,likeQuestionMutation,mutation
    }
}
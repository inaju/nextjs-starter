import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getTodos, likeTodo, postTodos } from "@/services";
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';

export const useHandleQuestion = () => {
  const { toast } = useToast()

  const queryClient = useQueryClient()
  const { isPending, error, data, isFetching, isLoading } = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const likeQuestionMutation = useMutation({
    mutationFn: likeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  const mutation = useMutation({
    mutationFn: postTodos,
    onError: (error, variables, context) => {
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
      return rest;
    },
  })


  return {
    isPending, error, data, isFetching, likeQuestionMutation, mutation, isLoading
  }
}
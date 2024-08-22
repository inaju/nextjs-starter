import Ask from "@/components/block/ask";
import Loader from "@/components/block/loader";
import Question from "@/components/block/question";
import { getTodos, likeTodo, postTodos } from "@/services";
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import _ from "lodash";

export default function Home() {
  const queryClient = useQueryClient()
  const { isPending, error, data, isFetching } = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const likeQuestionMutation = useMutation({
    mutationFn: likeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  const mutation = useMutation({
    mutationFn: postTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })


  if (error) return 'An error has occurred: ' + error.message

  const response = !_.isEmpty(data?.data?.data) ? data?.data?.data : []
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 relative`}>
      {isPending || isFetching && <Loader /> }
        <div className="flex flex-col gap-2">
          <div className="space-y-2 mb-10 sticky top-0 z-10 bg-white p-1">
            <Ask postTodos={postTodos} mutation={mutation} />
          </div>
          <div className="flex flex-col gap-2">

            {response?.map((item) =>
              <Question item={item} key={item?.id} likeQuestionMutation={likeQuestionMutation} />)}
          </div>
        </div>
      {/* } */}

    </main>
  )
}

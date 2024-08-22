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
  const isLoading = isPending && isFetching
  return (
    <main
      className={`flex min-h-screen flex-col max-w-[400px] lg: max-w-full w-full items-center justify-between lg:px-24 py-10 relative`}>
      {isLoading && <Loader />}
      {!isLoading &&
        <div className="flex flex-col gap-2">
          <div className="bg-white p-1 mb-10 sticky top-0 z-10">

          <h1 className="flex flex-start text-3xl font-bold mb-10">Komi</h1>
          <div className="">
            <Ask postTodos={postTodos} mutation={mutation} />
          </div>
          </div>
          {response?.length && !isLoading ?
            <div className="flex flex-col gap-2">
              {response?.map((item) =>
                <Question item={item} key={item?.id} likeQuestionMutation={likeQuestionMutation} />)}
            </div>
            :
            <p>No questions asked, Please ask your question</p>
          }
        </div>
      }

    </main>
  )
}

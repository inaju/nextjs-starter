import Ask from "@/components/block/ask";
import Loader from "@/components/block/loader";
import Question from "@/components/block/question";
import Visible from "@/components/block/visible";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useHandleQuestion } from "@/hooks/useHandleQuestion";
import { postTodos } from "@/services";
import _ from "lodash";

export default function Home() {
  const { isPending, error, data, isFetching, likeQuestionMutation, mutation } = useHandleQuestion();

  if (error) return 'An error has occurred: ' + error.message
  const response = !_.isEmpty(data?.data?.data) ? data?.data?.data : []
  const isLoading = isPending && isFetching;

  return (
    <main
      className={`flex min-h-screen flex-col 
      overflow-none max-w-[21.875rem] mx-6 
      lg:max-w-full w-full lg:items-center 
      justify-between lg:px-24 py-10 relative`}>
      <Visible when={isLoading}>
        <Loader />
      </Visible>
      <Visible when={!isLoading}>
        <div className="flex flex-col gap-2">
          <div className="bg-white p-1 mb-10 sticky top-0 z-10">
            <h1 className="flex flex-start text-3xl font-bold mb-10">Komi</h1>
            <div>
              <Ask mutation={mutation} />
            </div>
          </div>
          <Visible when={response?.length && !isLoading} otherwise={<p>No questions asked, Please ask your question</p>}>
            <div className="flex flex-col gap-2">
              {response?.map((item) =>
                <Question item={item} key={item?.id} likeQuestionMutation={likeQuestionMutation} />)}
            </div>
          </Visible>
        </div>
      </Visible>
    </main>
  )
}

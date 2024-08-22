import Ask from "@/components/block/ask";
import Avatar from "@/components/block/avatar";
import MainLayout from "@/components/block/layout/main-layout";
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
  const isLoading = isFetching;
  console.log(isPending, isFetching, 'isPending')
  return (
    <MainLayout>


      <div className="flex flex-col gap-2">
        <div className="bg-white p-1 mb-10 sticky top-0 z-10">
          <h1 className="flex flex-start text-3xl font-bold mb-10 justify-between">Komi
            <Avatar />
          </h1>
          <div>
            <Ask mutation={mutation} />
          </div>
        </div>
        <Visible when={response?.length} otherwise={<p>No questions asked, Please ask your question</p>}>
          <div className="flex flex-col gap-2">
            {response?.map((item) => <div key={item?.id}>
              <Question item={item} likeQuestionMutation={likeQuestionMutation} />
            </div>
            )}
          </div>
        </Visible>
      </div>
    </MainLayout>
  )
}

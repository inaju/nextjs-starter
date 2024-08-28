import Ask from "@/components/block/ask";
import Avatar from "@/components/block/avatar";
import Header from "@/components/block/header";
import MainLayout from "@/components/block/layout/main-layout";
import LoaderBlock from "@/components/block/loader";
import Loader from "@/components/block/loader";
import Question from "@/components/block/question";
import Visible from "@/components/block/visible";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useHandleQuestion } from "@/hooks/useHandleQuestion";
import { postTodos } from "@/services";
import _ from "lodash";
import { useEffect } from "react";

export default function Home() {
  const { error, data, likeQuestionMutation, mutation, isLoading } = useHandleQuestion();

  if (error) return 'An error has occurred: ' + error.message
  const response = !_.isEmpty(data?.data?.data) ? data?.data?.data : []
  return (
    <MainLayout>
      <HomeLayout />
    </MainLayout>
  )
}


export const HomeLayout = () => {
  const { error, data, likeQuestionMutation, mutation, isLoading } = useHandleQuestion();

  if (error) return 'An error has occurred: ' + error.message
  const response = !_.isEmpty(data?.data?.data) ? data?.data?.data : []
  return (
    <Visible when={!isLoading} otherwise={<LoaderBlock />}>
      <div className="flex flex-col gap-2">
        <div className="  p-1 mb-10 sticky top-10 z-10 ask-block">
          <div className=" ">
            <Ask mutation={mutation} />
          </div>
        </div>
        <Visible when={response?.length} otherwise={<p>No questions asked, Please ask your question</p>}>
          <div className="flex flex-col gap-2">
            {response?.map((item) => <div key={item?.id} className="question-block">
              <Question item={item} likeQuestionMutation={likeQuestionMutation} />
            </div>
            )}
          </div>
        </Visible>
      </div>
    </Visible>


  )
}

import Ask from "@/components/block/ask";
import MainLayout from "@/components/block/layout/main-layout";
import LoaderBlock from "@/components/block/loader";
import Question from "@/components/block/question";
import Visible from "@/components/block/visible";
import { useHandleEvent } from "@/hooks/useHandleEvent";
import dayjs from "dayjs";
import _ from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";

export default function EventsPage() {
    return (
        <MainLayout>
            <EventsLayout />
        </MainLayout>
    )
}


export const EventsLayout = () => {

    const { getSingleEventFunc, singleResponse,
        error, data, updatedResponse, mutation, isLoading } = useHandleEvent();
    const router = useRouter();
    if (error) return 'An error has occurred: ' + error.message
    const response = !_.isEmpty(data?.data) ? data?.data : []

    const returnFormattedDate = (data) => {
        const date = dayjs(data);
        const formattedDate = date.format("MMM D, YYYY");
        return formattedDate;
    }

    console.log(isLoading, 'isLoading')

    return (
        <Visible when={!isLoading} otherwise={<LoaderBlock />}>
            <Visible when={response?.length > 1} otherwise={<p>No Events Created, Please Create and event</p>}>
                <div
                    className="flex flex-row flex-wrap  flex-grow gap-4   rounded-lg  items-center justify-start">
                    {response?.map((item, index) =>
                        <div
                            key={item?.eventId}
                            onClick={() => router.push(`/event/${item?.eventId}`)}
                            className=" cursor-pointer  rounded-xl hover:bg-slate-100 bg-white " >
                            <div className="w-[22rem] lg:w-[18.75rem] h-[20.25rem] relative cursor-pointer " key={index}>
                                <Image src={item?.imageUrl} alt="event image" layout="fill" // required
                                    objectFit="cover" // change to suit your needs
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="px-6 py-6">

                                <div className="text-[0.75rem] font-medium text-slate-500">
                                    {returnFormattedDate(item?.date)} {item?.time}
                                    {item?.meridem}
                                </div>
                                <div className="text-[1.1875rem] font-bold text-slate-800">
                                    {item?.name}
                                </div>
                                <div className="text-[0.75rem] font-normal text-muted-foreground">
                                    {item?.eventMode}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </Visible>
        </Visible>


    )
}

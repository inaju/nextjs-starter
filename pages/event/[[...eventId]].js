/* eslint-disable */
'use client';
import { CustomBreadcrumbs } from "@/components/block/breadcrumbs";
import { AttendEvent } from "@/components/block/dialog/attend-event-dialog";
import MainLayout from "@/components/block/layout/main-layout";
import LoaderBlock from "@/components/block/loader";
import SeeMore from "@/components/block/see-more";
import Visible from "@/components/block/visible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useHandleEvent } from "@/hooks/useHandleEvent";
import dayjs from "dayjs";
import _ from "lodash";
import { Download, ShareIcon, StarsIcon, Users } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HomeLayout } from "..";

function EventPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params?.eventId[0]
    const [location, setLocation] = useState()
    const [isAttendingEvent, setisAttendingEvent] = useState(false)
    const { getSingleEventFunc, singleResponse } = useHandleEvent()
    useEffect(() => {
        if (eventId) {
            getSingleEventFunc.mutate({
                eventId: eventId
            })
        }
    }, [eventId])
    useEffect(() => {
        if (typeof window !== undefined) {
            setLocation(window?.location)
        }
    }, [typeof window])
    const date = dayjs(singleResponse?.date);
    const formattedDate = date.format("MMM D, YYYY");
    const handleDownload = (fileUrl, fileName) => {
        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName + ".png");
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error downloading the file:', error));
    };

    const handleAttendEventFunc = () => {
        toast(isAttendingEvent ? {
            title: "Opps!",
            description: "Feature Coming Soon",
        } : {
            title: "Yaay",
            description: `See you at ${singleResponse?.data?.name}`,
        })
        setisAttendingEvent(!isAttendingEvent)
    }
    return (
        <MainLayout>
            <Visible when={!_.isEmpty(singleResponse?.data)} otherwise={<LoaderBlock />}>
                <div>
                    <div className="flex flex-col gap-2 mb-4 " >
                        <CustomBreadcrumbs pathname={router?.asPath} label={`${singleResponse?.data?.name} Event Page`} />
                    </div>
                    <div className="h-[350px] w-full lg:h-[600px] relative rounded-xl ">
                        <Image src={singleResponse?.data?.imageUrl} alt="event image" layout="fill" // required
                            objectFit="cover" // change to suit your needs
                            className="rounded-xl"
                        />
                    </div>
                    <div>
                        <div className="flex flex-col mt-6">
                            <div className="h-[2.1875rem] w-[2.1875rem]  relative ">
                                <Image src={"https://img.freepik.com/free-vector/calendar-with-star_78370-7191.jpg"} alt="event image" layout="fill" // required
                                    objectFit="cover"
                                />
                            </div>
                            <div className="text-md font-medium text-red-500 mt-2">
                                {formattedDate} {singleResponse?.data?.time}
                                {singleResponse?.data?.meridem}
                            </div>
                            <div className="text-2xl font-bold text-slate-800 mt-4">
                                {singleResponse?.data?.name?.toUpperCase()}
                            </div>
                            <div className="text-md font-normal text-muted-foreground">
                                {singleResponse?.data?.eventMode}
                            </div>
                            <div className="flex gap-2 mt-6">
                                <div className="text-muted-foreground">
                                    Code:
                                </div>
                                <div className="text-md font-semibold text-slate-600">

                                    {singleResponse?.data?.eventCode}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex gap-2 flex-wrap">
                        <AttendEvent event={singleResponse?.data} eventOrganizer={singleResponse?.eventOrganizer} />
                        <Button className="flex gap-3" variant={!isAttendingEvent ? "outline" : "default"} onClick={() => handleAttendEventFunc()}>
                            {!isAttendingEvent ?
                                <>
                                    <StarsIcon size={15} />
                                    Attend Event
                                </> :
                                <>
                                    <Users size={15} />
                                    Going
                                </>
                            }
                        </Button>
                        <Button className="flex gap-3" variant="outline" onClick={() => handleDownload(singleResponse?.data?.qrcode, singleResponse?.data?.name)}>
                            <Download size={15} />
                            QR Code
                        </Button>
                        <Visible when={location}>
                            <CopyToClipboard text={`${location}`} onCopy={(text, result) => toast({
                                title: "Awesome!",
                                description: "Link Copied",

                            })}>
                                <Button variant="outline" className="flex gap-3">
                                    <ShareIcon size={15} />
                                    Share
                                </Button>
                            </CopyToClipboard>
                        </Visible>
                    </div>
                    <div>

                    </div>
                    <Separator className="my-4" />
                    <Visible when={singleResponse?.data?.description}>
                        <div className="whitespace-pre-line text-slate-500">
                            <SeeMore text={singleResponse?.data?.description} length="150" />
                        </div>
                    </Visible>
                </div>
                <Separator className="my-4 mt-20" />
                <div className="text-2xl font-bold text-slate-700">
                    Discussion
                </div>
                <HomeLayout />
            </Visible>

        </MainLayout>
    )
}


export default memo(EventPage)
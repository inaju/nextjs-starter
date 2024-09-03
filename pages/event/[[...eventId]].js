/* eslint-disable */
'use client';
import { CustomBreadcrumbs } from "@/components/block/breadcrumbs";
import { AttendEvent } from "@/components/block/dialog/attend-event-dialog";
import MainLayout from "@/components/block/layout/main-layout";
import LoaderBlock from "@/components/block/loader";
import SeeMore from "@/components/block/see-more";
import Visible from "@/components/block/visible";
import NextSeoComponent from "@/components/next-seo-component";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import useGetLocation from "@/hooks/useGetLocation";
import { useHandleEvent } from "@/hooks/useHandleEvent";
import { handleDownload } from "@/lib/utils";
import dayjs from "dayjs";
import _ from "lodash";
import { Download, ShareIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HomeLayout } from "..";

function EventPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params?.eventId[0]
    const { location } = useGetLocation()
    const { getSingleEventFunc, singleResponse } = useHandleEvent()
    useEffect(() => {
        if (eventId) {
            getSingleEventFunc.mutate({
                eventId: eventId
            })
        }
    }, [eventId])

    const date = dayjs(singleResponse?.date);
    const formattedDate = date.format("MMM D, YYYY");

    return (
        <MainLayout>
            <NextSeoComponent config={generateSeoConfig({
                title: singleResponse?.data?.name?.toUpperCase(),
                description: singleResponse?.data?.description,
                url: location,
                image: singleResponse?.data?.imageUrl
            })} />
            <Visible when={!_.isEmpty(singleResponse?.data)} otherwise={<LoaderBlock />}>
                <div>
                    <div className="flex flex-col gap-2 mt-4  mb-8" >
                        <CustomBreadcrumbs pathname={router?.asPath} label={`${singleResponse?.data?.name} Event Page`} />
                    </div>
                    <div className="mb-4 flex flex-row border p-4 items-center justify-between gap-y-4 rounded-lg shadow-[10px] bg-white ">
                        <div className="flex gap-2 items-center border-1  rounded-lg w-fit mt-2">
                            <div className="flex gap-2 ">
                                <Image src={singleResponse?.eventOrganizer?.image} alt="event organizer" height={20} width={25} className="rounded-full border border-1 border-slate-600" />
                                <div className="text-muted-foreground ">
                                    {singleResponse?.eventOrganizer?.name}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center ">
                            <div className="text-muted-foreground">
                                Code
                            </div>
                            <div className="text-md font-semibold text-slate-600">
                                {singleResponse?.data?.eventCode}
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full lg:h-[600px] relative rounded-xl ">
                        <Image src={singleResponse?.data?.imageUrl} alt="event image" layout="fill" // required
                            objectFit="cover" // change to suit your needs
                            className=" rounded-lg shadow-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-4 justify-between mt-6">
                        <div>

                            <div className="h-[2.1875rem] w-[2.1875rem]  relative ">
                                <Image src={"https://img.freepik.com/free-vector/calendar-with-star_78370-7191.jpg"} alt="event image" layout="fill" // required
                                    objectFit="cover"
                                />
                            </div>
                            <div className="text-md font-medium text-red-500 mt-2">
                                {formattedDate} {singleResponse?.data?.time}
                                {singleResponse?.data?.meridem}
                            </div>
                        </div>
                        <div>

                            <div className="text-2xl font-bold text-slate-800 mt-4">
                                {singleResponse?.data?.name?.toUpperCase()}
                            </div>
                            <div className="text-md font-normal text-muted-foreground">
                                {singleResponse?.data?.eventMode}
                            </div>
                        </div>

                    </div>
                    <Separator className="my-4" />
                    <div className="flex gap-2 flex-wrap">
                        <AttendEvent
                            event={singleResponse?.data}
                            eventOrganizer={singleResponse?.eventOrganizer}
                        />
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
                        <div className="whitespace-pre-line text-slate-500 text-[13px]">
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


const generateSeoConfig = ({ title, description, url, image }) => {
    return {
        title: title,
        description: description,
        openGraph: {
            url: url,
            title: title,
            description: description,
            images: [
                {
                    url: image,
                    width: 800,
                    height: 600,
                    alt: 'Og Image Alt',
                    type: 'image/jpeg',
                },],

        },
        twitter: {
            handle: '@mitchelinaju',
            site: 'www.mitchelinaju.com',
            cardType: 'summary_large_image',
        }
    }
}

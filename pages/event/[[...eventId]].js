'use client';
import { CustomBreadcrumbs } from "@/components/block/breadcrumbs";
import MainLayout from "@/components/block/layout/main-layout";
import LoaderBlock from "@/components/block/loader";
import SeeMore from "@/components/block/see-more";
import Visible from "@/components/block/visible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useHandleEvent } from "@/hooks/useHandleEvent";
import dayjs from "dayjs";
import { Download, ShareIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HomeLayout } from "..";
import { StarOff } from "lucide-react";
import { StarsIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast"
import _ from "lodash";

function EventPage() {
    const [value, setValue] = useState('dddd');
    const [copied, setCopied] = useState(false);
    const params = useParams();
    const router = useRouter();
    const eventId = params?.eventId[0]
    console.log(params, 'params')
    const { getSingleEventFunc, singleResponse } = useHandleEvent()
    useEffect(() => {
        if (eventId) {

            getSingleEventFunc.mutate({
                eventId: eventId
            })
        }
    }, [eventId]) // eslint-disable-line no-use-before-define
    // if (!params?.eventId && typeof window === undefined) { return window.location.href = ("/page-not-found?message=Event was not found") }

    // if (_.isEmpty(eventId)) { return window.location.href = ("/page-not-found?message=Event was not found") }
    // if (singleDataError) { return window.location.href = ("/page-not-found?message=" + singleDataError.message) }

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
    return (
        <MainLayout>
            <Visible when={!_.isEmpty(singleResponse)} otherwise={<LoaderBlock />}>
                <div>
                    <div className="flex flex-col gap-2 mb-4 " >
                        <CustomBreadcrumbs pathname={router?.asPath} label={`${singleResponse?.name} Event Page`} />
                    </div>
                    <div className="h-[350px] w-full lg:h-[600px] relative rounded-xl ">
                        <Image src={singleResponse?.imageUrl} alt="event image" layout="fill" // required
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
                            <div className="text-md font-medium text-red-500">
                                {formattedDate} {singleResponse?.time}
                                {singleResponse?.meridem}
                            </div>
                            <div className="text-2xl font-bold text-slate-800">
                                {singleResponse?.name}
                            </div>
                            <div className="text-md font-normal text-muted-foreground">
                                {singleResponse?.eventMode}
                            </div>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex gap-2 flex-wrap">
                        <Button className="flex gap-3" onClick={() => toast({
                            title: "Opps!",
                            description: "Feature Coming Soon",

                        })}>
                            <StarsIcon size={15} />
                            Attend
                        </Button>
                        <Button className="flex gap-3" variant="outline" onClick={() => handleDownload(singleResponse?.qrcode, singleResponse?.name)}>
                            <Download size={15} />
                            QR Code
                        </Button>
                        <CopyToClipboard text={`${router.asPath}`} onCopy={(text, result) => toast({
                            title: "Awesome!",
                            description: "Link Copied",

                        })}>
                            <Button variant="outline" className="flex gap-3">
                                <ShareIcon size={15} />
                                Share
                            </Button>
                        </CopyToClipboard>
                    </div>
                    <div>

                    </div>
                    <Separator className="my-4" />
                    <Visible when={singleResponse?.description}>
                        <div className="whitespace-pre-line text-slate-500">
                            <SeeMore text={singleResponse?.description} length="150" />
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
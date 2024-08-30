"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { z } from "zod"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import Image from "next/image"
import { PersonStanding } from "lucide-react"
import { useHandleEvent } from "@/hooks/useHandleEvent"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { StarsIcon } from "lucide-react"
import { Users } from "lucide-react"
import { User } from "lucide-react"
import EnterCodeDialog from "./enter-code"
import Visible from "../visible"
import StopAttendingEventDialog from "./stop-attending-event-dialog"

//if there is an event code
//show modal for attending event
//don't show modal for not-attending event

//if there's no event code
//don't show modal for attending and not attending event


export function AttendEvent({ event, eventOrganizer }) {
    const { attendEventFunc } = useHandleEvent()
    const { data: session, ...rest } = useSession()
    const userId = session?.user?.id
    const [isAttendingEvent, setIsAttendingEvent] = useState(event?.attendees.includes(userId))
    const [open, setOpen] = useState(false);
    const FormSchema = z.object({
        code: z.string().min(4, {
            message: "event code must be at least 4 characters.",
        }),
    })
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: "",
        },
    })

    async function onSubmit(data) {
        const response = {
            "eventId": event?.eventId,
            "userId": session.user.id,
            "isAttending": true,
            "eventCode": data.code
        }
        attendEventFunc.mutate(response)
        form?.reset()
    };

    const handleOpenDialog = () => {
        setOpen(!open)
    }
    useEffect(() => {
        closeDrawer();
    }, [attendEventFunc])

    const closeDrawer = () => {
        if (!attendEventFunc.isPending
            && attendEventFunc.data?.status !== 400
            && attendEventFunc.data != undefined) {
            setOpen(false)
            setIsAttendingEvent(true)
        }
    }
    return (
        <div>
            <Visible when={!isAttendingEvent}
                otherwise={<StopAttendingEventDialog {...{
                    event,
                    eventOrganizer,
                    isAttendingEvent,
                    setIsAttendingEvent
                }} />}>
                <EnterCodeDialog {...{
                    event,
                    eventOrganizer,
                    isAttendingEvent,
                    setIsAttendingEvent
                }} />
            </Visible>
        </div>
    )
}

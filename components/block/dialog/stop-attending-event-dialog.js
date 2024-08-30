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
import { toast } from "@/components/ui/use-toast"


import { useHandleEvent } from "@/hooks/useHandleEvent"
import { User, Users } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

const StopAttendingEventDialog = ({ ...props }) => {
    const { attendEventFunc } = useHandleEvent()
    const { data: session, ...rest } = useSession()
    const userId = session?.user?.id
    const [open, setOpen] = useState(false);

    async function onSubmit() {
        const response = {
            "eventId": props?.event?.eventId,
            "userId": session.user.id,
            "isAttending": false,
            "eventCode": props?.event?.eventCode
        }
        attendEventFunc.mutate(response)
        handleOpenDialog()
        toast({
            title: "Wow !",
            description: `Sorry to let you go`
        })
    };

    const handleOpenDialog = () => {
        setOpen(!open)
    }

    return (
        <Dialog open={open} onOpenChange={() => handleOpenDialog()}>
            <DialogTrigger asChild>
                <Button className="flex gap-3 border border-primary"
                    variant={!props?.isAttendingEvent ? "outline" : "default"}
                >
                    {!props?.isAttendingEvent ?
                        <>
                            <User size={15} />
                            Attend Event
                        </> :
                        <>
                            <Users size={15} />
                            Attending
                        </>
                    }
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="">Stop Attending?</DialogTitle>
                    <DialogDescription className="flex flex-col items-start">

                    </DialogDescription>
                </DialogHeader>
                <div
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >Do you want to stop attending this event?</div>
                <div className="text-sm text-muted-foreground">You will have to enter the code again to attend.</div>

                <div className="flex gap-2 mt-4">
                    <DialogFooter className="mt-4">
                        <Button
                            onClick={() => onSubmit()}
                            variant="secondary" disabled={attendEventFunc?.isPending} type="submit">
                            {attendEventFunc?.isPending ? "Loading..." : "Kick me out !"}
                        </Button>
                    </DialogFooter>
                    <DialogFooter className="mt-4">
                        <Button
                            onClick={() => handleOpenDialog()}
                            disabled={attendEventFunc?.isPending} type="submit">
                            {attendEventFunc?.isPending ? "Loading..." : "No"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default StopAttendingEventDialog

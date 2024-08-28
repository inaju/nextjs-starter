import React from 'react'
import Avatar from './avatar'
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { CalendarRangeIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { CreateEventForm } from './create-event-form'
import Visible from './visible'
import { PiIcon } from 'lucide-react'
import { PianoIcon } from 'lucide-react'
import { Plus } from 'lucide-react'


const Header = () => {
    const router = useRouter()
    const { data: session, ...rest } = useSession();
    return (
        <div className="flex flex-start text-3xl font-bold justify-between items-start">
            <h1 className=" text-3xl font-bold text-primary cursor-pointer" onClick={() => router.push('/')}>Komi</h1>
            <Visible when={session}>
                <div className='flex gap-2 items-start '>
                    <Button variant="outline" className='space-x-2' onClick={() => router.push('/event/all-events')}>
                        <PianoIcon size={17}  />
                        <div className='hidden md:block'>
                            Events
                        </div>
                    </Button>
                    <CreateEventDialog />
                    <Avatar />
                </div>
            </Visible>
        </div>
    )
}

export default Header



export function CreateEventDialog() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='space-x-2'>
                        <Plus size={17} />
                        <div className='hidden md:block'>
                            Create Event
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className=' flex space-x-2'>
                            <CalendarRangeIcon size={17} />
                            <div>
                                Create Event
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <CreateEventForm onOpenChange={setOpen} />
                </DialogContent>
            </Dialog>
        </div>

    )
}

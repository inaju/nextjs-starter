import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react'
import Visible from './visible'
import { useRouter } from "next/router"
import Image from "next/image"

const Avatar = () => {
    const { data: session, ...rest } = useSession()
    const userImage = session?.user?.image;
    const router=useRouter();
    
    return (
        <div>
            <Visible when={userImage}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Image
                            className='rounded-full border-2 border-slate-200'
                            src={userImage} alt="user image" height={38} width={38} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => signOut()}>logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Visible>
        </div>
    )
}

export default Avatar;

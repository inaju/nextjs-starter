import { useSession } from 'next-auth/react'
import React from 'react'

const Avatar = () => {
    const { data: session, ...rest } = useSession()
    const userImage = session?.user?.image || "/next.svg"
    return (
        <div>
            <img
                priority="high"
                className='rounded-full border-2 border-slate-200'
                src={userImage} alt="user image" height={30} width={30} />
        </div>
    )
}

export default Avatar;

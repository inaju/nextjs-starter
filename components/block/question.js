import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Image from 'next/image';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);



const Question = ({ item, likeQuestionMutation }) => {
    const { data: session } = useSession()
    const likes = item?.likedByUsers
    const userId = session?.user?.id;
    const [isLiked, setIsLiked] = useState(likes.includes(userId))

    const handleLikeAction = () => {
        setIsLiked(!isLiked)
        try {
            likeQuestionMutation.mutate({
                _id: item?._id,
                userId: userId,
            })
        } catch (err) {
            console.error(err, 'handleLikeAction here is it')
        }
    }
    const isGreaterThanZero = likes?.length > 0

    // Calculate time from now for a future date
    const futureDate = dayjs(item?.createdAt);
    const timeFromNow = futureDate.fromNow();

    return (
        <div key={item?.title} className="w-full p-4 space-y-6 border border-slate-4 rounded-lg shadow-sm bg-white ">
            <div className="space-y-3">
                <div className='flex gap-2  items-center'>
                    <Image
                        className='rounded-full border-2 border-slate-200'
                        src={item?.author?.image} alt="user image" height={25} width={25} />
                    <h2 className='font-semibold text-[#1e3038]'> {item?.author?.name}</h2>
                    <div className='flex justify-center'>

                        <p className='text-slate-500 text-[0.6rem]'>
                            {timeFromNow}
                        </p>
                    </div>
                </div>
                <p className='text-[#303030] whitespace-pre-line'>
                    {item?.title}
                </p>

            </div>

            <div onClick={() => handleLikeAction()} className='flex gap-1 items-center'>
                <Heart size={25} color={isLiked ? `#ff0000` : `#000000`} strokeWidth={isLiked ? 2 : 1.75} />
                <span className='text-slate-600 text-sm'>
                    {isGreaterThanZero && isLiked ? likes?.length : null}
                </span>
            </div>
        </div >
    )
}

export default Question

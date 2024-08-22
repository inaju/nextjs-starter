import { Heart } from 'lucide-react'
import React, { useState } from 'react'

const Question = ({ item, likeQuestionMutation }) => {
    const [isLiked, setIsLiked] = useState(item?.like > 0 ? true : false)

    const handleLikeAction = () => {
        try {
            likeQuestionMutation.mutate({
                _id: item?._id,
                value: isLiked
            })
            setIsLiked(true)
        } catch (err) {
            console.log(err, 'here is it')
        }
        // setIsLiked(!isLiked)
    }
    const isGreaterThanZero = item?.like > 0
    return (
        <div key={item?.title} className="w-full p-4 space-y-6 border border-slate-4 rounded-lg">
            <div className='flex gap-2'>
                <img
                    priority="high"
                    className='rounded-full border-2 border-slate-200'
                    src={item?.user?.image} alt="user image" height={25} width={25} />
                <h2 className='font-semibold text-slate-800'> {item?.user?.name}
                </h2>
            </div>
            <p className='text-slate-600'>
                {item?.title}
            </p>
            <div onClick={() => handleLikeAction()} className='flex gap-1 items-center'>
                <Heart size={20} color={isGreaterThanZero && isLiked ? `#ff0000` : `#000000`} strokeWidth={isGreaterThanZero && isLiked ? 1 : 0.75} />
                <span className='text-slate-600 text-sm'>
                    {isGreaterThanZero && isLiked ? item?.like : null}
                </span>
            </div>
        </div >
    )
}

export default Question

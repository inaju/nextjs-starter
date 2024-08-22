import { Heart } from 'lucide-react'
import React, { useState } from 'react'

const Question = ({ item, noOfLikes, likeQuestionMutation }) => {
    const [isLiked, setIsLiked] = useState(false)

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
    return (
        <div key={item?.title} className="w-full p-4 space-y-6 border border-slate-4 rounded-lg">
            <p>
                {item?.title}
            </p>
            <div onClick={() => handleLikeAction()} className='flex gap-1 items-center'>
                <Heart size={20} color={isLiked ? `#ff0000` : `#000000`} strokeWidth={isLiked ? 1 : 0.75} />
                <span className='text-slate-600 text-sm'>

                    {item?.like > 0 ? item?.like : null}
                </span>
            </div>
        </div>
    )
}

export default Question

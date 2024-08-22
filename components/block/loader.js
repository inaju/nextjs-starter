import React from 'react'
import { Loader } from 'lucide-react'

const LoaderBlock = () => {
    return (
        <div className={`flex min-h-screen flex-col 
            overflow-hidden max-w-[21.875rem] mx-6 
            lg:max-w-full w-full lg:items-center 
            justify-between lg:px-24 py-10 relative`}>
            <Loader />
        </div>
    )
}

export default LoaderBlock

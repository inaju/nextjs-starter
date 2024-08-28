import MainLayout from '@/components/block/layout/main-layout'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router';
import React from 'react'

const Custom404 = () => {
    const router = useRouter();

    return (
        <MainLayout>
            <div className='flex flex-col gap-10 items-center my-auto'>
                <p className='text-5xl text-center'>
                    Hey, This page was not found
                </p>
                <Button className="w-fit" onClick={() => router.push("/")}>Go Home</Button>
            </div>
        </MainLayout>
    )
}

export default Custom404

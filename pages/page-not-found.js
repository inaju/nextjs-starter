import MainLayout from '@/components/block/layout/main-layout'
import { Button } from '@/components/ui/button'
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'

const PageNotFound = () => {
    const router = useRouter();
    const params = useSearchParams();
    const message=params.get('message')

    return (
        <MainLayout>
            <div className='flex flex-col gap-10 items-center'>
                <p className='text-5xl text-center'>
                  {message?message:
                  " Hey, This page was not found"
                  } 
                </p>
                <Button className="w-fit" onClick={() => router.push("/")}>Go Home</Button>
            </div>
        </MainLayout>
    )
}

export default PageNotFound

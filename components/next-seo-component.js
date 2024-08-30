import { NextSeo } from 'next-seo'
import React from 'react'

const NextSeoComponent = ({config}) => {
    return (
        <div>
            <NextSeo {...config} />
        </div>
    )
}

export default NextSeoComponent

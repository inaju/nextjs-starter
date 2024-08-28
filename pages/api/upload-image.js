// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongoDB from "@/lib/utils";
import axios from "axios";
import Error from "next/error";

export default async function handler(req, res) {
    try {
        return new Promise(async (resolver) => {
            let image = req?.body?.base64String;
            const formData = new FormData();
            image = image.split(',')[1]
            formData.append('image', image);
            const response = await postImage(formData)
            resolver(
                res.status(200).json({ imageUrl: response })
            )
        })
    } catch (err) {
        console.log(err, 'this is the error')
        throw new Error(err);
    }
}


const postImage = async (formData) => {
    try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_IMGBB_API_KEY}`, formData)
        return response?.data?.data?.url;
    } catch (err) {
        console.log(err, 'this is the error')
        // throw new Error(err);
    }
}
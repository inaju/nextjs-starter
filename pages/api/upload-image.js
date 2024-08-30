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
        console.error(err, 'this is the error')
        throw new Error(err);
    }
}


let config = (fileName, data) => {
    return ({
        "method": 'put',
        "url": `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET}/` + fileName,
        "headers": {
            'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
            'Content-Type': 'text/plain',
            'AccessKey': process.env.R2_ACCESS_KEY,
            'SecretKey': process.env.R2_SECRET_KEY
        },
        "data": data
    });
}


const postImage = async (formData) => {
    try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_IMGBB_API_KEY}`, formData)
        return response?.data?.data?.url;
    } catch (err) {
        console.error(err, 'this is the error')
        // throw new Error(err);
    }
}
// export const postImage = async (fileName, data) => {
//     console.log(config(fileName, data),'HGJK')
//     try {
//         const response = await axios.put(config(fileName, data))
//         console.log(response,'dfkj response image')
//         return response?.data?.data?.url;
//     } catch (err) {
//         console.error(err, 'this is the error')
//         // throw new Error(err);
//     }
// }
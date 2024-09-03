import AWS from "aws-sdk";
import S3 from 'aws-sdk/clients/s3'; // Import only the S3 client

// Get Pre-Signed URL for Upload
export default async function handler(request, response) {
    // console.log(request,'request')
    const { file, fileName } = await request.body;
    console.error(file, fileName, 'file, fileName')

    try {
        const data = await uploadFile(file, fileName)
        return response.status(200).json({ data })
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
}


const uploadFile = async (file, fileName) => {
    const S3_BUCKET = "komi-web";
    const REGION = "us-east-2";
    AWS.config.update({
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
    });
    const s3 = new S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });
    const params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: file,
    };

    // try {
    //     const upload = await s3.putObject(params).promise();
    //     if (upload?.$response?.httpResponse.statusCode === 200) {
    //         return "https://komi-web.s3.us-east-2.amazonaws.com/" + fileName
    //     }
    //     alert("File uploaded successfully.");

    // } catch (error) {
    //     console.error(error);
    // }

};
import connectMongoDB, { genericTryCatch } from "@/lib/utils";
import { EventModel } from "@/models/event";
import { QuestionModel } from "@/models/question";
import { users } from "@/models/users";
import { ObjectId } from "mongodb";
import { generateQR } from "../utils/create-qr-code";
import axios from "axios";

await connectMongoDB();

export default async function handler(req, res) {
    console.log(req.body, 'req.body eventCode')
    try {
        switch (req.method) {
            case 'POST':
                try {
                    const { eventId } = req?.query

                    if (eventId) {
                        let event = await EventModel.findOne({
                            eventId: eventId[0]
                        });
                        const user = await users.findOne({
                            _id: event.eventOrganizer
                        });
                        res.status(200).json({ data: { data: event, eventOrganizer: user } })
                    }
                } catch (e) {
                    console.error(e.message, "/api/event/[...eventId]")
                    res.status(400).json({ data: e })

                }
        }
    } catch (err) {
        console.error(err?.errorResponse, `${req.method} err?.errorResponse`)
        res.status(400).json({
            message: `Please choose another event name apart from ` + err?.errorResponse?.keyValue.name,
            error: err?.errorResponse?.errmsg
        })
    }
}

const returnQrCode = async (baseurl, uuid) => {
    try {
        const url = baseurl + "/events/" + uuid;
        const response = await axios.post(`${baseurl}/api/upload-image`, {
            base64String: await generateQR(url)
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
        return response?.data;
    }
    catch (err) {
        console.error(err, `returnQrCode error`)
    }
}

function generateShortUUID(name) {
    if (name) {
        return (Math.random().toString(36).substring(2, 6) + name?.slice(0, 2))?.toUpperCase();
    }
}

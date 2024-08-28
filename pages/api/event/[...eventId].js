import connectMongoDB, { genericTryCatch } from "@/lib/utils";
import { EventModel } from "@/models/event";
import { QuestionModel } from "@/models/question";
import { users } from "@/models/users";
import { ObjectId } from "mongodb";
import { generateQR } from "../utils/create-qr-code";
import axios from "axios";

await connectMongoDB();

export default async function handler(req, res) {
    try {
        const { name, eventMode, description, time, date, meridem, imageUrl, likedByUsers, noOfAttendees, otherData } = req.body;
        switch (req.method) {
            case 'PUT':
                const nextRequestMeta = (key) => req[Reflect.ownKeys(req).find(
                    (s) => String(s) === key
                )];
                const host = nextRequestMeta("Symbol(kHeaders)").host
                const protocol = nextRequestMeta("Symbol(NextInternalRequestMeta)")._protocol
                const baseUrl = protocol + "://" + host
                if (!name) return res.status(400).json({ message: "please add a name" });
                if (!eventMode) return res.status(400).json({ message: "please add a eventMode" });
                if (!time) return res.status(400).json({ message: "please add a time" });
                if (!date) return res.status(400).json({ message: "please add a date" });
                if (!meridem) return res.status(400).json({ message: "please add a meridem" });
                if (!description) return res.status(400).json({ message: "please add a description" });
                const generatedEventId = generateShortUUID(name)
                const qrCode = await returnQrCode(baseUrl, generatedEventId)
                const newEvent = new EventModel({
                    qrcode: qrCode?.imageUrl,
                    eventId: generatedEventId,
                    name: name,
                    eventMode: eventMode,
                    description: description,
                    time: time,
                    date: date,
                    meridem: meridem,
                    imageUrl: imageUrl,
                    likedByUsers: {},
                    noOfAttendees: 0,
                    otherData: {}
                });
                await newEvent.save();
                res.status(200).json({ message: "event updated", data: newEvent })

            case 'POST':
                try {
                    const { eventId } = req?.query
                    if (eventId) {
                        const event = await EventModel.findOne({
                            eventId: eventId[0]
                        });
                        console.log(event, 'eventId')
                        res.status(200).json({ data: event })
                    }
                } catch (e) {
                    console.log(e)
                    res.status(400).json({ data: e })

                }
        }
    } catch (err) {
        console.log(err?.errorResponse, 'err?.errorResponse')
        res.status(400).json({
            message: `Please choose another event name apart from ` + err?.errorResponse?.keyValue.name,
            error: err?.errorResponse?.errmsg
        })
    }
}


const returnQrCode = async (baseurl, uuid) => {
    console.log(baseurl, 'baseurl')
    const url = baseurl + "/events/" + uuid;
    const response = await axios.post(`${baseurl}/api/upload-image`, {
        base64String: await generateQR(url)
    }, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }
    )
    return response?.data;
}

function generateShortUUID(name) {
    if (name) {
        return (Math.random().toString(36).substring(2, 6) + name?.slice(0, 2))?.toUpperCase();
    }
}

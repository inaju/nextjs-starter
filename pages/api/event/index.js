import { EventModel } from "@/models/event";
import axios from "axios";
import { generateQR } from "../utils/create-qr-code";


export default async function handler(req, res) {
    try {
        const { eventId, eventOrganizer, name, eventMode, eventCode, description, time, date, meridem, imageUrl, likedByUsers, noOfAttendees, otherData, ...rest } = req.body;
        switch (req.method) {
            case 'POST':
                try {
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
                    if (!description) return res.status(400).json({ message: "please add a description" });
                    if (!eventOrganizer) return res.status(400).json({ message: "eventOrganizer must be present" });
                    if (eventOrganizer && description && date && time && eventMode && name && eventCode) {
                        const generatedEventId = generateShortUUID(name).replace(/\s+/g, '')
                        const qrCode = await returnQrCode(baseUrl, generatedEventId)
                        const newEvent = new EventModel({
                            qrcode: qrCode?.imageUrl,
                            eventId: generatedEventId,
                            name: name,
                            eventMode: eventMode,
                            description: description,
                            eventOrganizer: eventOrganizer,
                            eventCode: eventCode,
                            time: time,
                            date: date,
                            meridem: meridem,
                            imageUrl: imageUrl,
                            likedByUsers: {},
                            noOfAttendees: 0,
                            otherData: {}
                        });
                        await newEvent.save();
                        res.status(200).json({ message: "event generated", data: newEvent })
                    }

                } catch (e) {
                    if (e.code == "11000") {
                        console.error(e.message, "/api/event post event error")
                        res.status(400).json({
                            message: `Please choose another name`,
                            error: e
                        })
                    } else {
                        console.error(e.message, "/api/event post event error")
                        res.status(400).json({
                            message: `There was an error`,
                            error: e
                        })
                    }
                }

            case 'GET':
                try {
                    if (eventId) {
                        const event = await EventModel.findOne({
                            eventId: eventId
                        }).sort({ createdAt: -1 });
                        console.log(event?.eventOrganizer,'dfkj event')

                        res.status(200).json({ data: event })
                    } else {
                        const event = await EventModel.find({}).sort({ createdAt: -1 });
                        res.status(200).json({ data: event })

                    }
                } catch (e) {
                    console.error(e.message, "/api/event get event error")

                }
        }
    } catch (err) {
        console.error(err?.errorResponse, 'err?.errorResponse')
        res.status(400).json({
            message: `Please choose another event name apart from ` + err?.errorResponse?.keyValue.name,
            error: err?.errorResponse?.errmsg
        })
    }
}


const returnQrCode = async (baseurl, uuid) => {
    const url = baseurl + "/event/" + uuid;
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
    return (Math.random().toString(36).substring(2, 6) + name.slice(0, 2))?.toUpperCase();
}

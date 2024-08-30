import { EventModel } from "@/models/event";
import { users } from "@/models/users";
import axios from "axios";
import { generateQR } from "../utils/create-qr-code";


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
 
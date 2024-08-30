import { EventModel } from "@/models/event";
import _ from "lodash";


export default async function handler(req, res) {
    try {
        const { isAttending, eventId, userId, eventCode, ...rest } = req.body;
        switch (req.method) {
            case 'PUT':
                try {
                    if (!eventCode) return res.status(400).json({ message: "please add your event code" });
                    if (!eventId) return res.status(400).json({ message: "please add your event ID" });
                    if (!_.isBoolean(isAttending)) return res.status(400).json({ message: "please add your isAttending" });
                    const filter = { eventId: eventId, eventCode: eventCode };
                    const addUser = {
                        $addToSet: {
                            "attendees": userId
                        }
                    }
                    const removeUser = {
                        $pull: {
                            "attendees": userId
                        }
                    };
                    const update = isAttending ? addUser : removeUser;
                    let doc = await EventModel.findOneAndUpdate(filter, update);
                    if (doc) {
                        res.status(200).json({ status: 200, message: "event saved", data: doc, })
                    } else {
                        res.status(400).json({
                            status: 400,
                            message: `You've entered the wrong event code`,
                        })
                    }

                } catch (e) {
                    res.status(400).json({
                        message: `There was an error`,
                        error: e,
                        status: 400,

                    })
                }

            default:
                res.status(400).json({
                    message: `change to PUT method`,
                    error: e,
                    status: 400,

                })
        }
    } catch (err) {
        res.status(400).json({
            message: `There was an error`,
            error: err,
            status: 400,

        })
    }
}


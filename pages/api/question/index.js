import connectMongoDB from "@/lib/utils";
import { QuestionModel } from "@/models/question";
await connectMongoDB();

export default async function handler(req, res) {

    const { qno } = req.query
    switch (req.method) {
        case 'POST':
            const { title } = req.body;
            if (!title) return res.status(400).json({ message: "please add a title" });
            try {
                const newQuestion = new QuestionModel({ title: title, like: 0 });
                await newQuestion.save();
                res.status(200).json({ message: "saved", data: newQuestion })
            } catch (error) {
                res.status(500).send(error.message);
            }
        case 'GET':
            const question = await QuestionModel.find({}).sort({ createdAt: -1 });
            try {
                res.status(200).json({ data: question })
            } catch (e) {
                console.log(e)
            }
    }

}
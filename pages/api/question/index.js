import connectMongoDB, { genericTryCatch } from "@/lib/utils";
import { QuestionModel } from "@/models/question";
import { users } from "@/models/users";
import { ObjectId } from "mongodb";
const mongo = await connectMongoDB();

export default async function handler(req, res) {
    try {
        const { title, userId } = req.body;
        switch (req.method) {
            case 'POST':
                if (!title) return res.status(400).json({ message: "please add a title" });
                if (!userId) return res.status(400).json({ message: "please add a title" });
                try {
                    const newQuestion = new QuestionModel({ title: title, like: 0, userId: userId });
                    await newQuestion.save();
                    res.status(200).json({ message: "saved", data: newQuestion })
                } catch (error) {
                    console.error(error.message, `${req.method} ${req?.url} error`)

                    res.status(500).send(error.message);
                }
            case 'GET':
                try {
                    const question = await QuestionModel.find({}).sort({ createdAt: -1 });
                    let response = []
                    await genericTryCatch(getCorrectQuestionResponse(question, response))
                    res.status(200).json({ data: response })
                } catch (error) {
                    console.error(error.message, `${req.method} ${req?.url} error`)
                }
        }
    } catch (error) {
    console.error(error.message, `${req.method} ${req?.url} error`)

    }
}

const getCorrectQuestionResponse = async (question, response) => {
    try{

        for (let index = 0; index < question?.length; index++) {
            const element = question[index];
            let newItem = element?._doc;
            if (!newItem?.userId) return null;
            const author = await users.findOne({ _id: new ObjectId(newItem?.userId) });
            newItem.author = author
            response.push({ ...newItem })
        }
    }catch(error){
        console.error(error ,`getCorrectQuestionResponse error`)

    }
}



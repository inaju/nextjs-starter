import connectMongoDB from "@/libs/mongodb";
import { QuestionModel } from "@/models/question";
await connectMongoDB();

export default async function handler(req, res) {

    if (req.method === 'PUT') {
        const { value, _id } = req.body;
        // if (_.isEmpty(value)) { return res.status(400).json({ message: "please add a value" }); }
        // if (_.isEmpty(_id)) { return res.status(400).json({ message: "please add a _id" }); }
        try {
            const question = await QuestionModel.findById({ _id: _id });
            const currentLikeValue = question?.like
            console.log(currentLikeValue, 'currentLikeValue')
            const response = await QuestionModel.updateOne({ _id: _id }, { like: currentLikeValue + 1 });
            res.status(200).json({ message: "success", data: question })
        } catch (error) {
            res.status(500).send({ message: error.message, error: true });
        }
    }
}

const incrementOrDecrementFunc = (value, currentLikeValue) => {
    if (value && currentLikeValue >= 0) {
        return value ? currentLikeValue + 1 : currentLikeValue - 1
    } else return 0;
}
import { QuestionModel } from "@/models/question";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { _id, userId } = req.body;
        // console.warn(req?.url,'req')
        try {
            const question = await QuestionModel.findById({ _id: _id });
            const questionIsLiked = question?.likedByUsers?.includes(userId)
            let updateOperation;

            if (questionIsLiked) {
                updateOperation = { $pull: { likedByUsers: userId } };
            } else {
                updateOperation = { $addToSet: { likedByUsers: userId } };
            }
            const response=await QuestionModel.findOneAndUpdate(
                { _id: _id },
                updateOperation,
                { new: true }
            );
            res.status(200).json({ message: "success", data: response })
        } catch (error) {
            console.error(error.message, `${req.method} ${req?.url} error`)
            res.status(500).send({ message: error.message, error: true });
        }
    }
};
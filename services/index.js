import axios from "axios";

const axiosheaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}
const getTodos = async () => {
    try {
        const response = await axios
            .get('/api/question', {
                headers: axiosheaders,
            })
        return response;
    } catch (err) {
        throw new Error(err);
    }
}
const likeTodo = async (data) => {

    try {
        const response = await axios
            .put('/api/question/like', data,
                {
                    headers: axiosheaders,
                })
        return response?.data
    } catch (err) {
        throw new Error(err);
    }
}
const postTodos = async (data) => {

    try {
        const response = await axios
            .post('/api/question', data,
                {
                    headers: axiosheaders,
                })
        return response?.data
    } catch (err) {
        throw new Error(err);
    }
}

export { getTodos, likeTodo, postTodos };

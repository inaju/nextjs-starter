import axios from "axios";

export const axiosheaders = {
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
const getSingleEvent = async (data) => {
    try {
        if (data?.eventId) {
            const response = await axios
                .post(`/api/event/${data?.eventId}`, {
                    headers: axiosheaders,
                })
            return response?.data;
        }
    } catch (err) {
        throw new Error(err);
    }
}
const getEvent = async () => {
    try {
        const response = await axios
            .get('/api/event', {
                headers: axiosheaders,
            })
        return response?.data;
    } catch (err) {
        throw new Error(err);
    }
}
const postEvent = async (data) => {
    try {
        const response = await axios
            .post('/api/event', data,
                {
                    headers: axiosheaders,
                })
        return response?.data
    } catch (err) {
        return err;
    }
}
const attendEvent = async (data) => {
    try {
        const response = await axios
            .put('/api/event/attend-event', data,
                {
                    headers: axiosheaders,
                })
        return response?.data
    } catch (err) {
        return err;
    }
}

export {
    getTodos,
    likeTodo,
    postTodos,
    postEvent,
    getEvent, 
    getSingleEvent, 
    attendEvent
};

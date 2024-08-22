import axios from "axios";

const getTodos = () => {
    try {
        const response = axios
            .get('/api/question', {
                headers: {
                    Accept: 'application/json',
                },
            })
        return response;
    } catch (err) {
        console.log(err, 'error')
    }
}
const likeTodo = (data) => {
    try {
        const response = axios
            .put('/api/question/like', data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                })
        return response?.data
    } catch (err) {
        console.log(err, 'error message')
    }
}
const postTodos = (data) => {
    try {
        const response = axios
            .post('/api/question', data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                })
        return response?.data
    } catch (err) {
        console.log(err, 'error')
    }
}

export { getTodos, postTodos,likeTodo }
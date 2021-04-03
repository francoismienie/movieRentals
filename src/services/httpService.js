import axios from 'axios';

axios.interceptors.response.use(null, error => {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
        console.log(error);
        alert("An unexpected error occurred");
    }

    return Promise.reject(error);
})

function setAuth(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setAuth
}
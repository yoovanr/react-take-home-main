import axios from 'axios'

import { toast } from 'react-toastify'

const instance = axios.create({ baseURL: 'http://localhost:8080' })

instance.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error && error.response && error.response.data) {
        const data = error.response.data

        if (data.error && data.error.issues && data.error.issues.length) {
            const message = data.error.issues.map((issue) => issue.message).join('\n')

            toast.error(message, {
                position: 'bottom-right',
            })
        }
    }

    return Promise.reject(error)
})

export default instance
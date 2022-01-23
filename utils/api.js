import axios from 'axios'

const api = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_HOST
    const get = async (url, token) => {
        const response = await axios(`${baseUrl}/${url}`, {
            method: 'GET',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        })
        return response
    }

    const post = async (url, token, data) => {
        const response = await axios(`${baseUrl}/${url}`, {
            method: 'POST',
            data: data,
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        })
        return response
    }

    return { get, post }
}

export default api
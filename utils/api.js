import axios from 'axios'

export const api = async (url, token = null) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_HOST
    try {
        const response = await axios(`${baseUrl}/${url}`, {
            method: 'GET',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        })
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }
}
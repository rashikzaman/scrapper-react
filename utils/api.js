import axios from 'axios'

export const api = async (url, token = null) => {
    const baseUrl = "http://localhost:8080/api";
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
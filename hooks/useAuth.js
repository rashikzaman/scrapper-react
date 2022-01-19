import axios from 'axios'
import cookie from '../utils/cookie';
import { useDataProviderContext } from '../contexts/DataContext';
import Router from 'next/router'

const useAuth = () => {
    const { setUser } = useDataProviderContext()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_HOST
    const login = async (event) => {
        const data = new FormData(event.currentTarget);
        try {
            const result = await axios.post(`${baseUrl}/auth/login`, {
                email: data.get("email"),
                password: data.get("password")
            })
            if (result.status === 200) {
                setUser(result.data)
                cookie.setAccessTokenCookie(result.data.access_key)
                Router.push('/')
            } else {
                alert("Sorry, Login failed!")
            }
        } catch (e) {
            if (e.response) {
                if (e.response.status == '401') {
                    alert("Sorry, Login failed")
                }
            }
            else
                alert("Sorry, Network Failed")
        }
    }

    const register = async (event) => {
        const data = new FormData(event.currentTarget);
        try {
            const result = await axios.post(`${baseUrl}/auth/signup`, {
                email: data.get("email"),
                password: data.get("password")
            })
            if (result.status === 201) {
                setUser(result.data)
                cookie.setAccessTokenCookie(result.data.access_key)
                Router.push('/')
            } else {
                alert("Sorry, Registration failed!")
            }
        } catch (e) {
            if (e.response) {
                if (e.response.status === 401 || e.response.status === 500) {
                    alert("Sorry, Registration failed")
                }
            }
            else
                alert("Sorry, Network Failed")
        }
    }

    return { login, register }
}

export default useAuth
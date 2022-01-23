import cookie from '../utils/cookie';
import { useDataProviderContext } from '../contexts/DataContext';
import Router from 'next/router'
import api from '../utils/api'

const useAuth = () => {
    const { setUser } = useDataProviderContext()
    const login = async (event) => {
        const data = new FormData(event.currentTarget);
        try {
            const result = await api().post("auth/login", null, {
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
                if (e.response.status == '401' || e.response.status === '500') {
                    alert("Sorry, Login failed")
                } else if (e.response.status === 400) {
                    alert("Login failed, Bad request")
                } else {
                    alert("Sorry, Can't process your request")
                }
            }
            else
                alert("Sorry, Network Failed")
        }
    }

    const register = async (event) => {
        const data = new FormData(event.currentTarget);
        try {
            const result = await api().post(`auth/signup`, null, {
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
                } else if (e.response.status === 400) {
                    alert("Registration failed, Bad request")
                } else {
                    alert("Sorry, Cann't process your request")
                }
            }
            else
                alert("Sorry, Network Failed")
        }
    }

    return { login, register }
}

export default useAuth
import {mainUrl} from "@/app/services/base";
import axios from "axios";

export const auth = {
    login: async (data) => {
        const url = 'https://education07.pythonanywhere.com/auth/jwt/create/'
        return await axios.post(url, data)
    },
    register: async (data) => {
        const url = 'https://education07.pythonanywhere.com/auth/users/'
        return await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            res => {
                console.log(res)
                return res
            }
        ).catch(error => error)
    },
    logout: async () => {
        const url = 'https://education07.pythonanywhere.com/auth/jwt/refresh/'
        return await axios.post(url, {
            refresh: JSON.parse(localStorage.getItem('tokens')).refresh
        })
    },
    confirmEmail: async (uid, token) => {
        const url = 'https://education07.pythonanywhere.com/auth/users/activation/'
        return await axios.post(url, {
            uid: uid, token: token
        })
    },
    getProfile: async (token) => {
        const url = 'https://education07.pythonanywhere.com/auth/users/me/'
        return await axios.get(url, {
            headers: {
                'Authorization': token
            },
        })
    }
}
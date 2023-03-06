import {mainUrl} from "@/app/services/base";
import axios from "axios";

export const auth = {
    login: async (data) => {
        const url = mainUrl + 'user/token/'
        return await axios.post(url, data)
    },
    register: async (data) => {
        const url = mainUrl + 'user/'
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
        const url = mainUrl + 'user/logout/blacklist/'
        return await axios.post(url, {
            refresh_token: JSON.parse(localStorage.getItem('tokens')).refresh
        }).then(res => {
            return res
        }).catch(err => console.log(err))
    }
}
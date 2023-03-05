import {mainUrl} from "@/app/services/base";
import axios from "axios";
import {parseBody} from "next/dist/server/api-utils/node";

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
    }
}
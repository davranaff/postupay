import {mainUrl} from "@/app/services/base";
import axios from "axios";
import {useBaseContext} from "@/app/context/BaseContext";


export const test = {
    async getTest(id, token) {
        const url = mainUrl + `university/test/?subject=${id}`
        return axios.get(url, {
            headers: {
                'Authorization': token,
            },
        })
    }
}
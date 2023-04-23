import {mainUrl} from "@/app/services/base";
import axios from "axios";
import {useBaseContext} from "@/app/context/BaseContext";


export const test = {
    async getTest(id, token) {
        const url = mainUrl + `university/test/?subject=${id}`
        return await axios.get(url, {
            headers: {
                'Authorization': token,
            },
        })
    },
    async postTests(tests, token) {
        const url = mainUrl + `university/test/result`
        return await axios.post(url, {data: tests}, {
            headers: {
                'Authorization': token
            }
        })
    }
}
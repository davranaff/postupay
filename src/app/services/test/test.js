import {mainUrl} from "@/app/services/base";
import axios from "axios";


export const test = {
    async getTest (id) {
        const url = mainUrl + `university/test/?subject=${id}`
        return axios.get(url)
    }
}
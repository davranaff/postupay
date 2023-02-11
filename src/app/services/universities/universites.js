import {mainUrl} from "@/app/services/base";
import axios from "axios";


export const universities = {
    getAll: async () => {
        const url = mainUrl + 'universities/'
        return await axios.get(url).then( res => res.data )
    },
    getOne: async (id) => {
        const url = mainUrl + `university/${id}`
        return await axios.get(url)
    }
}
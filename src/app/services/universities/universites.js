import {mainUrl} from "@/app/services/base";
import axios from "axios";


export const universities = {
    getAll: async () => {
        const url = mainUrl + 'universities/'
        return await axios.get(url).then( res => res.data )
    },
    getOne: async (id) => {
        const url = mainUrl + `university/${id}/`
        return await axios.get(url)
    },
    async getQuestions (id) {
        const url = mainUrl + `university/test?subject=${id}/`
        return await axios.get(url).then( res => res.data )
    },
    async saveUniversity (userId, universityId, token) {
        const url = mainUrl + `user/favourite/`
        return await axios.post(url, {
            data: {
                user_id: userId,
                university_id: universityId
            }
        }, {headers: {'Authorization': token}})
    },
    async getFavourites (token) {
        const url = mainUrl + 'user/favourite/1/'
        return await axios.get(url, {headers: {'Authorization': token}})
    },
    async deleteUniversity (universityId, token) {
        const url = mainUrl + `user/favourite/${universityId}/`
        return await axios.delete(url, {headers: {'Authorization': token}})
    }
}
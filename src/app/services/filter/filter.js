import {mainUrl} from "@/app/services/base";
import axios from "axios";


export const filter = {
    getFilterResult: async (paramUrl) => {
        const url = mainUrl + 'university/filter/?' + paramUrl
        return await axios.get(url)
    },
    getSearchResult: async (query) => {
        const url = mainUrl + 'university-query/?search=' + query
        return await axios.get(url)
    },
    getRegions: async _ => {
        const url = mainUrl + 'city/'
        return await axios.get(url)
    },
    getSubjects: async _ => {
        const url = mainUrl + 'subject/'
        return await axios.get(url)
    },
    getEducationTypes: async _ => {
        const url = mainUrl + 'education-type/'
        return await axios.get(url)
    },
    getEducationForms: async _ => {
        const url = mainUrl + 'education-form/'
        return await axios.get(url)
    },
    getEducationDegrees: async _ => {
        const url = mainUrl + 'education-degree/'
        return await axios.get(url)
    }
}
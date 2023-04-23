import React, {useEffect, useState} from 'react';
import {FilterContext} from "@/app/context/FilterContext";
import FilterResult from "@/app/components/Filter/result/FilterResult";
import FilterActions from "@/app/components/Filter/actions/FilterActions";
import {filter} from "@/app/services/filter/filter";
import {useRouter} from "next/router";

function Filter(props) {
    const [showSideBar, setShowSideBar] = useState(true)
    const [data, setData] = useState([])
    const [params, setParams] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(_ => {
        if (Object.keys(router.query).length > 0) {
            const arr = []
            
            Object.keys(router.query).forEach((element) => {
                if (typeof router.query[element] === "object") {
                    router.query[element].forEach(item => {
                        arr.push(`${element}=${item}`)
                    })
                    return
                }
                arr.push(`${element}=${router.query[element]}`)
            })
            filter.getFilterResult(`${arr.join("&")}`).then(r => {
                setData(r.data)
                console.log(r.data)
                setLoading(false)
            })
            return
        }
        async function getData() {
            await filter.getFilterResult(params).then(res => {
                setData(res.data)
                setLoading(false)
            })
        }

        getData()
    }, [params, router.query])


    return (
        <FilterContext.Provider value={{loading, setLoading, showSideBar, setShowSideBar, data, setData, setParams}}>
            <FilterResult/>
            <FilterActions {...props}/>
        </FilterContext.Provider>
    );
}

export default Filter;
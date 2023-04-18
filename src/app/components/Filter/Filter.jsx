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
    const [used, setUsed] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(_ => {
        async function getData() {
            await filter.getFilterResult(params).then(res => {
                setData(res.data)
                setLoading(false)
            })
        }

        getData()
        if (router.query.education_type && used <= 0) {
            console.log(used, 'used')
            setUsed(used + 1)
            filter.getFilterResult(`${router.query.education_type}`).then(r => {
                setData(r.data)
                setLoading(false)
            })
        }
    }, [params])


    return (
        <FilterContext.Provider value={{loading, setLoading, showSideBar, setShowSideBar, data, setData, setParams, used}}>
            <FilterResult/>
            <FilterActions {...props}/>
        </FilterContext.Provider>
    );
}

export default Filter;
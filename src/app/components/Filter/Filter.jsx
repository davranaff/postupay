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
    const [miniLoading, setMiniLoading] = useState(false)
    const [pagination, setPagination] = useState('&limit=10&offset=0')
    const [allCount, setAllCount] = useState(null)

    useEffect(_ => {
        if (router.query.education_type && used <= 0) {
            setUsed(used + 1)
            filter.getFilterResult(`${router.query.education_type}`).then(r => {
                setData(r.data)
                setLoading(false)
            })
            return
        }
        async function getData() {
            setMiniLoading(true)
            await filter.getFilterResult(params + pagination).then(res => {
                setData(res.data.results)
                setLoading(false)
                setMiniLoading(false)
                setAllCount(res.data.count)
            })
        }

        getData()
    }, [params, pagination])


    return (
        <FilterContext.Provider value={{allCount, pagination, setPagination,miniLoading, loading, setLoading, showSideBar, setShowSideBar, data, setData, setParams, used}}>
            <FilterResult/>
            <FilterActions {...props}/>
        </FilterContext.Provider>
    );
}

export default Filter;
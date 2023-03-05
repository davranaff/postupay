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
    useEffect(  _ => {
         async function getData() {
             await filter.getFilterResult(params).then(res => setData(res.data))
         }
         getData()
        console.log(params)
    } , [params] )

    return (
        <FilterContext.Provider value={{showSideBar, setShowSideBar, data, setData, setParams}}>
            <FilterResult/>
            <FilterActions {...props}/>
        </FilterContext.Provider>
    );
}

export default Filter;
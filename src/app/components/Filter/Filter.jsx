import React, {useEffect, useState} from 'react';
import {FilterContext} from "@/app/context/FilterContext";
import FilterResult from "@/app/components/Filter/result/FilterResult";
import FilterActions from "@/app/components/Filter/actions/FilterActions";
import {filter} from "@/app/services/filter/filter";
import {useRouter} from "next/router";
import {element} from "prop-types";

const PAGE_SIZE = 10;

function Filter(props) {
    const [showSideBar, setShowSideBar] = useState(true)
    const [data, setData] = useState([])
    const [params, setParams] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [miniLoading, setMiniLoading] = useState(false)
    const [pagination, setPagination] = useState({limit: PAGE_SIZE, offset: 10});
    const [hasMore, setHasMore] = useState(true);
    const [allCount, setAllCount] = useState(null)
    const [pArr, setPArr] = useState([])
    useEffect(_ => {
        if (Object.keys(router.query).length > 0) {
            let arr = []

            Object.keys(router.query).forEach((element) => {
                if (typeof router.query[element] === "object") {
                    router.query[element].forEach(item => {
                        arr.push(`${element}=${item}`)
                        setPArr(arr)
                        setPagination({limit: PAGE_SIZE, offset: 0})
                        // setArr([...arr,`${element}=${item}`])
                    })
                    return
                }
                arr.push(`${element}=${router.query[element]}`)
                setPagination({limit: PAGE_SIZE, offset: 0})
                setPArr(arr)
                // setArr([...arr,`${element}=${router.query[element]}` ])
            })
            setMiniLoading(true)
            filter.getFilterResult(`${arr.join("&")}`, {limit: PAGE_SIZE, offset: 0}).then(r => {
                setData(r.data.results)
                setLoading(false)
                setMiniLoading(false)
                setAllCount(r.data.count)
                setHasMore(r.data.next !== null)
            })
            return
        }

       else {
            async function getData() {
                setMiniLoading(true)
                await filter.getFilterResult('', pagination).then(res => {
                    setData(res.data.results)
                    setLoading(false)
                    setMiniLoading(false)
                    setAllCount(res.data.count)
                    setHasMore(res.data.next !== null);
                })
            }


            getData()
        }
    }, [params, router.query])

    const handleLoadMore = async () => {


        if (!hasMore) {
            return
        } else {
            setMiniLoading(true);
            const newPagination = {...pagination};
            console.log(newPagination)
            newPagination.offset += PAGE_SIZE;
            setPagination(newPagination);
            await filter.getFilterResult( pArr.join('&'), newPagination).then(res => {
                const newData = res.data.results;
                setData([...data, ...newData]);
                setMiniLoading(false);
                setHasMore(res.data.next !== null);
            });
        }

    };


    return (
        <FilterContext.Provider value={{
            allCount,
            pagination,
            setPagination,
            miniLoading,
            loading,
            setLoading,
            showSideBar,
            setShowSideBar,
            data,
            setData,
            setParams,
            handleLoadMore,
            hasMore,
        }}>
            <FilterResult/>
            <FilterActions {...props}/>
        </FilterContext.Provider>
    );
}

export default Filter;
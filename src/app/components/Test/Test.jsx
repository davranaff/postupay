import React, {useEffect, useState} from 'react';
import {TestContext} from "@/app/context/TestContext";
import Options from "@/app/components/Test/Options/Options";
import Questions from "@/app/components/Test/Questions/Questions";

function Test(props) {
    const [data, setData] = useState([])
    const [active, setActive] = useState(props.data[0])

    useEffect(_ => {
        const local = JSON.parse(localStorage.getItem('data'))
        if (local === null) {
            setData(props.data)
            return
        }
        setData(local)
        setActive(local[0])
    }, [])

    return (
        <TestContext.Provider value={{active, setActive, data, setData}}>
            <Options/>
            <Questions/>
        </TestContext.Provider>
    );
}

export default Test;
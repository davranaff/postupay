import React, {useEffect, useState} from 'react';
import {TestContext} from "@/app/context/TestContext";
import Options from "@/app/components/Test/Options/Options";
import Questions from "@/app/components/Test/Questions/Questions";

function Test(props) {
    const [data, setData] = useState([])
    const [active, setActive] = useState(null)


    useEffect(_ => {
        let tests = props.tests.map( v => ({...v, answers: v.answers.map(value => ({...value, done: false}))}))
        localStorage.setItem('tests',JSON.stringify(tests))
        const local = JSON.parse(localStorage.getItem('tests'))
        if (local === null) {
            setData(tests)
            return
        }
        setData(local)
    }, [])

    return (
        <TestContext.Provider value={{active, setActive, data, setData}}>
            <Options tests={props.tests}/>
            <Questions/>
        </TestContext.Provider>
    );
}

export default Test;
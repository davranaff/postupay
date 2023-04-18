import React, {useEffect, useState} from 'react';
import {TestContext} from "@/app/context/TestContext";
import Options from "@/app/components/Test/Options/Options";
import Questions from "@/app/components/Test/Questions/Questions";
import Router, {useRouter} from "next/router";
import NProgress from "nprogress";

function Test(props) {
    const [tests, setTests] = useState([])
    const [active, setActive] = useState(null)


    useEffect(_ => {
        console.log(props.tests)
        let tests = JSON.parse(localStorage.getItem('tests'))
        if (tests !== null) {
            setTests(tests)
            return
        }
        tests = props.tests.map( v => ({...v, done:false, answers: v.answers.map(value => ({...value, done: false}))}))
        localStorage.setItem('tests',JSON.stringify(tests))
        setTests(tests)
    }, [])

    return (
        <TestContext.Provider value={{active, setActive, tests, setTests}}>
            <Options tests={props.tests} university={props.university}/>
            <Questions/>
        </TestContext.Provider>
    );
}

export default Test;

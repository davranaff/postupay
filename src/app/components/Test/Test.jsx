import React, {useEffect, useState} from 'react';
import {TestContext} from "@/app/context/TestContext";
import Options from "@/app/components/Test/Options/Options";
import Questions from "@/app/components/Test/Questions/Questions";
import Router, {useRouter} from "next/router";
import NProgress from "nprogress";

function Test(props) {
    const [tests, setTests] = useState([])
    const [active, setActive] = useState(null)
    const [number, setNumber] = useState(null)
    
    useEffect(_ => {
        console.log(props.university)
        let testss = JSON.parse(localStorage.getItem('tests'))
        if (testss !== null || testss === []) {
            setTests(testss)
            return
        }
        testss = props.tests.map( v => ({...v, done:false, answers: v.answers.map(value => ({...value, done: false}))}))
        localStorage.setItem('tests',JSON.stringify(testss))
        setTests(testss)
        console.log(props.university)
    }, [])

    return (
        <TestContext.Provider value={{active, setActive, tests, setTests, number, setNumber}}>
            <Options tests={props.tests} university={props.university}/>
            <Questions number={number}/>
        </TestContext.Provider>
    );
}

export default Test;

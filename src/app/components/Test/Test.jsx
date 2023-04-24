import React, {useEffect, useState} from 'react';
import {TestContext} from "@/app/context/TestContext";
import Options from "@/app/components/Test/Options/Options";
import Questions from "@/app/components/Test/Questions/Questions";
import Router, {useRouter} from "next/router";

function Test(props) {
    const route = useRouter()
    const [tests, setTests] = useState({})
    const [active, setActive] = useState(null)
    const [number, setNumber] = useState(null)
    const [current, setCurrent] = useState(null)
    const [leaveTest, setLeaveTest] = useState(false)
    const [subjectValue, setSubjectValue] = useState(null)
    const [showModal, setShowModal] = useState(true)
    const [leave, setLeave] = useState(false)

    useEffect(_ => {
        let testss = JSON.parse(localStorage.getItem('tests'))
        if (testss !== null && testss.tests.length !== 0 && testss.id === props.subject) {
            
            setTests(testss)
            return
        }
        const data = props.tests.map( v => ({...v, done:false, answers: v.answers.map(value => ({...value, done: false}))}))
        testss = {id: props.subject, tests: data}
        localStorage.setItem('tests',JSON.stringify(testss))
        setTests(testss)
    }, [route.query])
    
    if (tests) return (
        <TestContext.Provider value={{active,
         setActive,
         tests,
         setTests,
         number,
         setNumber,
         current,
         setCurrent,
         leaveTest,
         setLeaveTest,
         subjectValue,
         setSubjectValue,
         showModal,
         setShowModal,
         leave,
         setLeave}}>
            <Options tests={props.tests} university={props.university} time={props.time}/>
            <Questions number={number} university={props.university}/>
        </TestContext.Provider>
    );
}

export default Test;

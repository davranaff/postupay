import React from 'react';
import style from './test.module.css'
import Test from "@/app/components/Test/Test";
import {test} from "@/app/services/test/test";
import {universities} from "@/app/services/universities/universites";

function Index(props) {
    return (
        <section className={style.container}>
            <Test {...props} />
        </section>
    );
}

export async function getServerSideProps(context) {
    try {
        let tests = await test.getTest(context.query.subject, context.query.tk_).then(res => res.data).catch(e => console.log(e))
        let university = null
        if (tests.length) university = await universities.getOne(tests[0].university).then(res => res.data).catch(e => console.log(e))
        return {
            props: {
                tests: tests,
                university: university,
            }
        }
    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: "/signup",
            },
        }
    }
}

export default Index;
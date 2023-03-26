import React from 'react';
import style from './test.module.css'
import Test from "@/app/components/Test/Test";
import {test} from "@/app/services/test/test";

function Index(props) {
    return (
        <section className={style.container}>
            <Test {...props} />
        </section>
    );
}

export async function getServerSideProps(context) {
    let tests = await test.getTest(2, context.query.tk_).then(res => res.data)

    console.log(tests)
    return {
        props: {
            tests: tests,
        }
    }
}

export default Index;
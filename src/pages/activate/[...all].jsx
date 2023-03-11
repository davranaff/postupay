import React from 'react';
import style from './activate.module.css'
import Link from "next/link";
import {auth} from "@/app/services/auth/auth";

function Uid() {

    return (
        <div className={style.main}>
            <div className={style.content}>
                <h1>Почта подтверждена</h1>
                <Link href={'/'}>Перейти на главную страницу</Link>
            </div>
        </div>
    );
}


export async function getServerSideProps(context) {
    const {params} = context
    const uid = params.all[0]
    const token = params.all[1]

    function sendConfirm() {
        return auth.confirmEmail(uid, token).then(res => {
            console.log(res)
            return res
        }).catch(e => console.log(e))
    }

    await sendConfirm()

    return {
        props: {},
    }
}

export default Uid;
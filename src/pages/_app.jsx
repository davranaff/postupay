import '@/app/globals.css'
import App from "@/app/components/App";
import {UserContext} from "@/app/context/BaseContext";
import {useEffect, useState} from "react";

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
import Head from "next/head";
import {NextIntlProvider} from "next-intl"; //styles of nprogress

//Route Events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function Application({Component, pageProps}) {
    const [user, setUser] = useState({
        active: false,
        access: '',
        refresh: ''
    })
    const [language, setLanguage]  = useState({
        lang: 'Ru', image: './icons/russia.png'
    })

    useEffect(
        _ => {
            const data = JSON.parse(localStorage.getItem('tokens'))
            if (data && Object.keys(data).length !== 0) {
                setUser(
                    {
                        active: data.active || false,
                        access: data.access || '',
                        refresh: data.refresh || ''
                    }
                )
            }
        }, []
    )

    return <UserContext.Provider value={{user, setUser, language, setLanguage}}>
        <Head>
            <link rel="icon" href="https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM"/>
        </Head>
        <App>
            <Component {...pageProps} />
        </App>
    </UserContext.Provider>
}

export default Application


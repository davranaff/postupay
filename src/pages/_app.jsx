import '@/app/globals.css'
import App from "@/app/components/App";
import {UserContext} from "@/app/context/BaseContext";
import {useEffect, useState} from "react";
import Router, {useRouter} from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
import Head from "next/head";
import "../i18n"
import Script from "next/script";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function Application({Component, pageProps}) {
    const {locale} = useRouter()
    const [user, setUser] = useState({
        active: false,
        access: '',
        refresh: ''
    })
    const [language, setLanguage] = useState({
        lang: 'Ru', image: './icons/russia.png'
    })

    const [customer, setCustomer] = useState(null)
    const [count, setCount] = useState(0)

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

    return <UserContext.Provider value={{user, setUser, language, setLanguage, customer, setCustomer, count, setCount}}>
        <Head>
            <link rel="icon" href="icons/logo.svg"/>
        </Head>
        <App>
          <Component {...pageProps} dir={locale}/>
        </App>
        <Script>
                {/*    (function(w,d,s,l,i){w[l] = w[l] || []; w[l].push({'gtm.start':*/}
                {/*    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],*/}
                {/*    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=*/}
                {/*    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);*/}
                {/*})(window,document,'script','dataLayer','GTM-MDQB2KD');*/}
        </Script>

    </UserContext.Provider>
}

export default Application


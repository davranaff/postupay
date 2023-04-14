import style from './navbar.module.css'
import Link from "next/link";
import {useRouter} from "next/router";
import {useBaseContext, UserContext} from "@/app/context/BaseContext";
import {useContext, useEffect, useState} from "react";
import {auth} from "@/app/services/auth/auth";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";
import {appWithTranslation} from "next-i18next";


function Navbar(props) {
    const route = useRouter()
    const {user, setUser} = useBaseContext()
    const [show, setShow] = useState(false)

    const [showSelect, setShowSelect] = useState(false)

    const {language, setLanguage} = useContext(UserContext)
    const {customer, setCustomer} = useContext(UserContext)

    const {t} = useTranslation()

    const languages = [
        {lang: 'Ru', image: 'icons/russia.png'},
        {lang: 'Uzb', image: 'icons/uzbekistan.png'},
    ]

    const changeLang = (lang) => {
        setLanguage(lang)
        setShowSelect(false)
        i18n.changeLanguage(lang.lang.toLowerCase())
    }

    useEffect(() => {
        if (i18n.language === 'ru') {
            setLanguage({lang: 'Ru', image: './icons/russia.png'})
        } else {
            setLanguage({lang: 'Uzb', image: './icons/uzbekistan.png'})
        }
        // changeLang()
    }, [])

    useEffect(() => {
        route.events.on('routeChangeComplete', () => {
            document.documentElement.lang = localStorage.i18nextLng;
        });
    }, []);


    useEffect(_ => {
        auth.getProfile(
            localStorage.getItem('Authorization')
        ).then(
            res => {
                localStorage.setItem('user', JSON.stringify(res.data))
            }
        ).catch(
            err => {
                console.log(err.response.data.detail)
                if (localStorage.getItem('Authorization') && !localStorage.getItem('user')) {
                    toast.warn(t('toasts.no_permission'))
                }
            }
        )


    }, [route.pathname])

    useEffect(() => {
        setTimeout(() => setCustomer(JSON.parse(localStorage.getItem('user'))), 1)

    }, [])

    async function logout() {
        if (user) {
            const data = await auth.logout().then(res => {
                toast.info(t('toasts.logout'))
                localStorage.removeItem('user')
                localStorage.removeItem('Authorization')
                localStorage.removeItem('ally-supports-cache')
                return res

            }).catch(err => {
                toast.error(t('toasts.something'))
                console.log(err)
            })
            setUser({...user, active: false, access: '', refresh: ''})
            localStorage.removeItem('tokens')
        }
    }

    return (
        <nav className={style.navbar}>
            <Link href='/' className={style.navbarLogo}>postupay</Link>
            <div className={style.navbarAuth}>
                <div className={style.navItem}>
                    <div className={style.langSelect}>
                        <p className={style.lang}
                           onClick={() => setShowSelect(!showSelect)}>

                            <span>{language.lang}</span>
                            {language.lang === "Ru"
                                ? <img src='/icons/russia.png' alt={language.lang}/>
                                : <img src='/icons/uzbekistan.png' alt={language.lang}/>}


                        </p>
                        {showSelect && (
                            <div className={style.languages}>
                                {languages.map(lang => (
                                    <span key={lang.image} className={style.selectItem}
                                          onClick={() => changeLang(lang)}>{lang.lang}</span>
                                ))}
                            </div>)}
                    </div>
                </div>
                {route.pathname !== '/filter' &&
                <div className={style.navItem}>
                    <Link href='/filter' className={style.button}>
                        {`${t('home.navbar.find_univer')}`}
                    </Link>
                </div>
                }
                {user.active ?
                    <div className={style.navItem}>
                        <div className={`${style.navProfile} ${style.button} ${style.signinbtn}`}
                             onClick={_ => setShow(!show)}>
                            <img src="/icons/check.svg" alt="check"/>
                            {customer ? customer.first_name + ' ' + customer.last_name[0] + '.' : ''}
                        </div>
                        <div className={`${style.dropDown} ${show && style.dropDownActive}`}>
                            <ul>
                                <li onClick={_ => {
                                    route.push('/profile')
                                    setShow(false)
                                }}>{`${t('home.navbar.profile')}`}
                                </li>

                                <li onClick={_ => {
                                    route.push('/profile?save=true')
                                    setShow(false)
                                }}>{`${t('home.navbar.saved')}`}
                                </li>
                                <li onClick={_ => {
                                    logout()
                                    setShow(false)
                                }}>{`${t('home.navbar.log_out')}`}
                                </li>
                            </ul>

                        </div>
                    </div>
                    : !['/signin', '/signup'].includes(route.pathname) &&
                    <Link href='/signin/' className={`${style.navItem} ${style.button} ${style.signinbtn}`}>
                        <div className={style.check}></div>
                        {`${t('home.navbar.sign_in')}`}
                    </Link>}
            </div>
        </nav>
    );
}

export default appWithTranslation(Navbar);
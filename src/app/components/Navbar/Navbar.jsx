import style from './navbar.module.css'
import Link from "next/link";
import {useRouter} from "next/router";
import {useBaseContext, UserContext} from "@/app/context/BaseContext";
import {useContext, useEffect, useState} from "react";
import {auth} from "@/app/services/auth/auth";
import {toast} from "react-toastify";
import Image from "next/image";

function Navbar(props) {
    const route = useRouter()
    const {user, setUser} = useBaseContext()
    const [show, setShow] = useState(false)

    const [showSelect, setShowSelect] = useState(false)

    const {language, setLanguage} = useContext(UserContext)
    const {customer, setCustomer} = useContext(UserContext)
    const languages = [
        {lang: 'Ru', image: './icons/russia.png'},
        {lang: 'Uzb', image: './icons/uzbekistan.png'},
    ]
    const changeLang = (lang) => {
        setLanguage(lang)
        setShowSelect(false)
    }


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
                if (localStorage.getItem('Authorization' ) && !localStorage.getItem('user'))  {
                    toast.warn('У вас нету доступа!')
                }
            }
        )




    }, [route.pathname])

    useEffect(() => {
       setTimeout(() =>  setCustomer(JSON.parse(localStorage.getItem('user'))), 1)
    }, [])

    async function logout() {
        if (user) {
            const data = await auth.logout().then(res => {
                toast.info('Вы вышли из аккаунта!')
                localStorage.removeItem('user')
                localStorage.removeItem('Authorization')
                localStorage.removeItem('ally-supports-cache')
                return res

            }).catch(err => {
                toast.error('Что-то пошло не так!')
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
                            <span>{language.lang}</span> <img src={language.image} />
                        </p>
                        {showSelect && (
                            <div className={style.languages}>
                                {languages.map(lang => (
                                    <span className={style.selectItem} onClick={() => changeLang(lang)}>{lang.lang}</span>
                                ))}
                            </div>)}
                    </div>
                </div>
                {route.pathname !== '/filter' && <Link href='/filter' className={style.button}>
                    Найти Вуз
                </Link>}
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
                                }}>Профиль
                                </li>

                                <li onClick={_ => {
                                    route.push('/profile?save=true')
                                    setShow(false)
                                }}>Сохраненные ВУЗы
                                </li>
                                <li onClick={_ => {
                                    logout()
                                    setShow(false)
                                }}>Выйти
                                </li>
                            </ul>

                        </div>
                    </div>
                    : !['/signin', '/signup'].includes(route.pathname) &&
                    <Link href='/signin/' className={`${style.navItem} ${style.button} ${style.signinbtn}`}>
                        <div className={style.check}></div>
                        Войти
                    </Link>}
            </div>
        </nav>
    );
}

export default Navbar;
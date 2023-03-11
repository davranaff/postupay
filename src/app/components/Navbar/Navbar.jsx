import style from './navbar.module.css'
import Link from "next/link";
import {useRouter} from "next/router";
import {useBaseContext} from "@/app/context/BaseContext";
import {useEffect, useState} from "react";
import {auth} from "@/app/services/auth/auth";
import {toast} from "react-toastify";

function Navbar(props) {
    const route = useRouter()
    const {user, setUser} = useBaseContext()
    const [show, setShow] = useState(false)
    const [profile, setProfile] = useState(null)

    useEffect(_ => {
        if (user.active) {
            auth.getProfile(
                localStorage.getItem('Authorization')
            ).then(
                res => {
                    setProfile(res.data)
                }
            ).catch(
                err => {
                    console.log(err)
                    toast.warn('У вас нету доступа!')
                }
            )
        }
    }, [])

    async function logout() {
        if (user) {
            const data = await auth.logout().then(res => {
                toast.info('Вы вышли из аккаунта!')
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
                {route.pathname !== '/filter' && <Link href='/filter' className={style.button}>
                    Найти Вуз
                </Link>}
                {user.active ?
                    <div className={style.navItem}>
                        <div className={style.navProfile} onClick={_ => setShow(!show)}>
                            <img src="/icons/check.svg" alt="check"/>
                            {profile && profile.first_name + ' ' + profile.last_name[0] + '.'}
                        </div>
                        <div className={`${style.dropDown} ${show && style.dropDownActive}`}>
                            <ul>
                                <li onClick={_ => {
                                    route.push('/profile')
                                    setShow(false)
                                }}>Изменить
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
                    <Link href='signin/' className={style.navItem}>
                        <div className={style.check}></div>
                        Войти
                    </Link>}
            </div>
        </nav>
    );
}

export default Navbar;
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
    const [customer, setCustomer] = useState(null)

    useEffect(_ => {


        auth.getProfile(
            localStorage.getItem('Authorization')
        ).then(
            res => {
                console.log(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
            }
        ).catch(
            err => {
                console.log(err.response.data.detail)
                if (localStorage.getItem('Authorization')) {
                    toast.warn('У вас нету доступа!')
                }
            }
        )




    }, [route.pathname])

    useEffect(() => {
       setTimeout(() =>  setCustomer(JSON.parse(localStorage.getItem('user'))), 1000 )
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
                    <Link href='/signin/' className={`${style.navItem} ${style.button} ${style.signinbtn}`}>
                        <div className={style.check}></div>
                        Войти
                    </Link>}
            </div>
        </nav>
    );
}

export default Navbar;
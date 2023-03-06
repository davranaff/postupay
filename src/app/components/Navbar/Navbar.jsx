import style from './navbar.module.css'
import Link from "next/link";
import {useRouter} from "next/router";
import {useBaseContext} from "@/app/context/BaseContext";
import {useState} from "react";
import {auth} from "@/app/services/auth/auth";

function Navbar(props) {
    const route = useRouter()
    const {user, setUser} = useBaseContext()
    const [show, setShow] = useState(false)

    async function logout() {
        if (user) {
            const data = await auth.logout()
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
                            Иван И.
                        </div>
                        <div className={`${style.dropDown} ${show && style.dropDownActive}`}>
                            <ul>
                                <li onClick={_ => {
                                    route.push('/profile?update=true')
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
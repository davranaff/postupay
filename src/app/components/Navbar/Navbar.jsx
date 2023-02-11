import style  from './navbar.module.css'
import Link from "next/link";


function Navbar(props) {
    return (
        <nav className={style.navbar}>
            <Link href='/' className={style.navbarLogo}>postupay</Link>
            <div className={style.navbarAuth}>
                 <Link href='/filter' className={style.button}>
                     Найти Вуз
                 </Link>
                 <Link href='signin/' className={style.sign}>
                    Войти
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
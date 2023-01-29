import style  from './navbar.module.css'
import Image from "next/image";


function Navbar(props) {
    return (
        <nav className={style.navbar}>
            <h1 className={style.navbarLogo}>postupay</h1>
            <h1 className={style.navbarAuth}>
                <Image src={'icons/check.svg'} alt={'check'} width={20} height={20}/>
                Войти
            </h1>
        </nav>
    );
}

export default Navbar;
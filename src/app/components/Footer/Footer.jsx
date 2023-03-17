import style from './footer.module.css'
import Image from "next/image";
import Link from "next/link";


function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.footerItem}>
                <Link href={'/'} className={style.footerLogo}>postupay</Link>
                <ul className={style.footerInfo}>
                    <li>Наши контакты:</li>
                    <li>+998 97 444 73 37</li>
                    <li>+998 94 444 25 25</li>
                    <li>postupay@vuz.com (для вузов по работе с личным кабинетом)</li>
                    <li>Улица Кадырова, дом 76.</li>
                </ul>
            </div>
            <div className={style.footerItemR}>
                <div className={style.footerIcons}>
                    <Image src='icons/Insta.svg' width={35} height={35} alt='instagram'/>
                    <Image src='icons/Teleg.svg' width={35} height={35} alt='telegram'/>
                </div>
                <p className={style.footerRights}>При цитировании с сайта, ссылка на источник обязательна.</p>
            </div>
        </footer>
    );
}

export default Footer;
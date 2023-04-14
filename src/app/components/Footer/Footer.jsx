import style from './footer.module.css'
import Image from "next/image";
import Link from "next/link";
import {useTranslation} from "react-i18next";


function Footer() {
    const {t} = useTranslation()
    return (
        <footer className={style.footer}>
            <div className={style.footerItem}>
                <a href={'/'} className={style.footerLogo}>postupay</a>
                <ul className={style.footerInfo}>
                    <li>{t('home.contact')}</li>
                    <li><a href="tel:+998900807766" className={style.footerLinks}>+998 90 080 77 66</a></li>
                    <li><a href="tel:+998914448044" className={style.footerLinks}>+998 91 444 80 44</a></li>
                    <li><a href="mailto:postupay.uz@gmail.com" className={style.footerLinks}>postupay.uz@gmail.com</a></li>
                    <li>г. Ташкент, ул. Аккурган 14.</li>
                </ul>
            </div>
            <div className={style.footerItemR}>
                <div className={style.footerIcons}>
                    <Link href={'https://www.instagram.com/postupay.uz/'}><Image src='/icons/Insta.svg' width={35} height={35} alt='instagram'/></Link>
                    <Link href={'https://t.me/postupay_uz'}><Image src='/icons/Teleg.svg' width={35} height={35} alt='telegram'/></Link>
                </div>
                <p className={style.footerRights}>{t('home.footer_text')}</p>
            </div>
        </footer>
    );
}

export default Footer;
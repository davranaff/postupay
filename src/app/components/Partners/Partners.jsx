import style from './partners.module.css'
import Image from "next/image";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {useTranslation} from "react-i18next";
import {useContext, useEffect} from "react";
import {UserContext} from "@/app/context/BaseContext";
import i18next from "i18next";
import i18n from "@/i18n";


function Partners(props) {
    const {t} = useTranslation()
    useEffect(() => {
        i18n.changeLanguage(i18n.language)
    }, [i18n.language])
    return (
        <div className={style.main}>
            <h1 className={style.title}>{t('home.partners.partners')}</h1>
            <Splide className={style.sliders} options={{
                type: 'loop',
                rewind: true,
                rewindByDrag: true,
                flickPower: true,
                autoplay: true,
                speed: 1000,
                perPage: 3,
                perMove: 1,
                focus: 'center',
                gap: "40px",
                interval: 9000,
                pauseOnHover: false,
                arrows: false,
                pagination: false,
                autoWidth: true,
            }}>
                <SplideSlide>
                    <Image src='/sliders/partners/logo.svg' alt='partner' width={0} height={0}/>
                </SplideSlide>
                <SplideSlide>
                    <Image src='sliders/partners/logo.svg' alt='partner' width={0} height={0}/>
                </SplideSlide>
                <SplideSlide>
                    <Image src='sliders/partners/logo.svg' alt='partner' width={0} height={0}/>
                </SplideSlide>
                <SplideSlide>
                    <Image src='sliders/partners/logo.svg' alt='partner' width={0} height={0}/>
                </SplideSlide>
            </Splide>
        </div>
    );
}

export default Partners;
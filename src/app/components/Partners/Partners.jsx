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
                autoplay: true,
                speed: 1000,
                gap: "100px",
                breakpoints:  {
                    700 :{
                        gap : 0
                    }
                },
                perPage: 3,
                perMove: 1,
                interval: 9000,
                pauseOnHover: false,
                pagination: false,
            }}>
                <SplideSlide>
                    <img src="/icons/logoLevel.png" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="/icons/logoLevel.png" alt=""/>

                </SplideSlide>
                <SplideSlide>
                    <img src="/icons/logoLevel.png" alt=""/>

                </SplideSlide>
                <SplideSlide>
                    <img src="/icons/logoLevel.png" alt=""/>
                </SplideSlide>
            </Splide>
        </div>
    );
}

export default Partners;
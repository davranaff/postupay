import style from './partners.module.css'
import Image from "next/image";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';


function Partners(props) {
    return (
        <div className={style.main}>
            <h1 className={style.title}>Партнеры</h1>
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
                padding: '15%',
                interval: 2200,
                pauseOnHover: false,
                arrows: false,
                pagination: false,
                autoWidth: true,
            }}>
                <SplideSlide>
                    <Image src='sliders/partners/logo.svg' alt='partner' width={0} height={0}/>
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
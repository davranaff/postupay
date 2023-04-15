import style from './carousel.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {CarouselProvider, Slide, Slider} from "pure-react-carousel";
import {Splide, SplideSlide} from "@splidejs/react-splide";

function CarouselH() {

    return (
        <div className={style.main}>
            <Splide className={style.carouselContent} options={{
                autoplay: true,
                pagination: false,
                arrows: false,
                perPage: 1,
                type: 'loop',
                pauseOnHover: false,
                rewindSpeed: 7000
            }}>
                <SplideSlide>
                    <img src="/sliders/header/slider1.svg" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="/sliders/header/slider2.svg" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="/sliders/header/slider3.svg" alt=""/>
                </SplideSlide>
            </Splide>
            <Splide className={style.carouselContentMobile} options={{
                autoplay: true,
                pagination: false,
                arrows: false,
                perPage: 1,
                type: 'loop',
                pauseOnHover: false,
                rewindSpeed: 7000
            }}>
                <SplideSlide>
                    <img src="/sliders/header/sliderm1.svg" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="/sliders/header/sliderm2.svg" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="/sliders/header/sliderm3.svg" alt=""/>
                </SplideSlide>
            </Splide>
        </div>
    );
}

export default CarouselH;
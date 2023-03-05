import style from './carousel.module.css'
import {Splide, SplideSlide} from "@splidejs/react-splide";

function Carousel() {

    return (
        <div className={style.main}>
            <Splide className={style.carouselContent} options={{
                type: 'loop',
                rewind: true,
                autoplay: true,
                arrows: false,
                speed: 1000,
                perPage: 3,
                perMove: 1,
                focus: 'center',
                interval: 2000,
                pauseOnHover: false,
                pagination: false,
            }}>
                <SplideSlide>
                    <img src="sliders/header/slider1.svg" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="sliders/header/slider2.svg" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="sliders/header/slider3.svg" alt=""/>
                </SplideSlide>
            </Splide>
            <Splide className={style.carouselContentMobile} options={{
                type: 'loop',
                rewind: true,
                autoplay: true,
                arrows: false,
                speed: 1000,
                perPage: 3,
                perMove: 1,
                focus: 'center',
                interval: 2000,
                pauseOnHover: false,
                pagination: false,
                autoWidth: true,
            }}>
                <SplideSlide>
                    <img src="sliders/header/sliderm1.svg" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="sliders/header/sliderm2.svg" alt=""/>
                </SplideSlide>
                <SplideSlide>
                    <img src="sliders/header/sliderm3.svg" alt=""/>
                </SplideSlide>
            </Splide>
        </div>
    );
}

export default Carousel;
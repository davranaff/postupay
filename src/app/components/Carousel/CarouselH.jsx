import style from './carousel.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {CarouselProvider, Slide, Slider} from "pure-react-carousel";
function CarouselH() {

    return (
        <div className={style.main}>
            <CarouselProvider className={style.carouselContent} naturalSlideWidth={30}
                                        naturalSlideHeight={10}
                                        totalSlides={3}
                                        interval={10000}
                                        isPlaying={true}
                                        infinite={true}
                                        visibleSlides={1}>
                <Slider>
                   <Slide index={0}><img src="/sliders/header/slider1.svg" alt=""/></Slide>
                   <Slide index={1}><img src="/sliders/header/slider2.svg" alt=""/></Slide>
                   <Slide index={2}><img src="/sliders/header/slider3.svg" alt=""/></Slide>
                </Slider>
            </CarouselProvider>
           <CarouselProvider className={style.carouselContentMobile} naturalSlideWidth={30}
                                        naturalSlideHeight={10}
                                        totalSlides={3}
                                        interval={10000}
                                        isPlaying={true}
                                        infinite={true}
                                        visibleSlides={1}>
                <Slider>
                   <Slide index={0} style={{paddingBottom: '100px'}}><img src="/sliders/header/sliderm1.svg" alt=""/></Slide>
                   <Slide index={1} style={{paddingBottom: '100px'}}><img src="/sliders/header/sliderm2.svg" alt=""/></Slide>
                   <Slide index={2} style={{paddingBottom: '100px'}}><img src="/sliders/header/sliderm3.svg" alt=""/></Slide>
                </Slider>
            </CarouselProvider>
        </div>
    );
}

export default CarouselH;
import style from './carousel.module.css'
import Image from "next/image";
import Slider from "src/infinite-react-carousel";

function Carousel() {

    return (
        <div className={style.main}>
            <div className={style.mainContent}>
                <Slider arrows={false} slidesToShow={1} pauseOnHover={false} autoplay={true}>
                    <Image src="sliders/header/Slider.svg" alt="Slider1" width='0' height='0'/>
                    <Image src="sliders/header/Slider2.svg" alt="Slider2" width='0' height='0'/>
                    <Image src="sliders/header/Slider3.svg" alt="Slider3" width='0' height='0'/>
                </Slider>
            </div>
        </div>
    );
}

export default Carousel;
import style from './partners.module.css'
import Slider from 'src/infinite-react-carousel'
import Image from "next/image";

function Partners(props) {
    return (
        <div className={style.main}>
            <h1 className={style.title}>Партнеры</h1>
            <Slider className={style.sliders} slidesToShow={3} arrows={false} autoplay={true}>
                <Image src='sliders/partners/logo.svg' alt='partner' width={0} height={0} />
                <Image src='sliders/partners/logo.svg' alt='partner' width={0} height={0} />
                <Image src='sliders/partners/logo.svg' alt='partner' width={0} height={0} />
                <Image src='sliders/partners/logo.svg' alt='partner' width={0} height={0} />
            </Slider>
        </div>
    );
}

export default Partners;
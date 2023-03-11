import style from './news.module.css'
import NewsItem from "@/app/components/News/NewsItem";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';


function News(props) {
    return (
        <div className={style.main}>
            <h1 className={style.title}>Новости</h1>

            <Splide className={style.newsContent} options={{
                type: 'loop',
                rewind: true,
                rewindByDrag: true,
                flickPower: true,
                autoplay: true,
                speed: 1000,
                perPage: 3,
                perMove: 1,
                focus: 'center',
                interval: 1800,
                pauseOnHover: false,
                pagination: false,
                autoWidth: true,
            }}>
                <SplideSlide>
                    <NewsItem/>
                </SplideSlide>
                <SplideSlide>
                    <NewsItem/>
                </SplideSlide>
                <SplideSlide>
                    <NewsItem/>
                </SplideSlide>
                <SplideSlide>
                    <NewsItem/>
                </SplideSlide>
            </Splide>
        </div>
    );
}

export default News;
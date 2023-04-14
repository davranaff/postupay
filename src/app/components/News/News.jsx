import style from './news.module.css'
import NewsItem from "@/app/components/News/NewsItem";
import {useEffect, useState} from "react";
import axios from "axios";
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';
import {useTranslation} from "react-i18next";
import {Splide, SplideSlide} from "@splidejs/react-splide";


function News(props) {
    const [posts, setPosts] = useState(null)
    const {t} = useTranslation()

    useEffect(() => {
        axios.get('https://education07.pythonanywhere.com/api/news/')
            .then(res => setPosts(res.data))
            .catch(err => console.error(err))
    }, [])
    return (
        <div className={style.main}>
            <h1 className={style.title}>{t('home.news.news')}</h1>
            {posts && <Splide options={{
                autoplay: true,
                pagination: false,
                perPage: 3,
                type: 'loop',
                pauseOnHover: false,
            }}>
                {posts.map(post => <SplideSlide  key={post.id}>
                        <NewsItem post={post}/>
                    </SplideSlide>)}
            </Splide>}
        </div>
    );
}

export default News;
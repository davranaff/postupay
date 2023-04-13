import style from './news.module.css'
import NewsItem from "@/app/components/News/NewsItem";
import {useEffect, useState} from "react";
import axios from "axios";
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';
import {useTranslation} from "react-i18next";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {Grid} from "@splidejs/splide-extension-grid";

function News(props) {
    const [posts, setPosts] = useState(null)
    const {t} = useTranslation()


    useEffect(() => {
        axios.get('https://education07.pythonanywhere.com/api/news/')
            .then(res => setPosts(res.data))
            .catch(err => console.error(err))
    }, [])
    console.log(posts)
    return (
        <div className={style.main}>
            <h1 className={style.title}>{t('home.news.news')}</h1>
            <br/>
            {posts && <Splide options={{
                // grid: {
                //     rows: 1,
                //     cols: 1,
                //     gap: {
                //         col: '1.5rem'
                //     },
                // },
                breakpoints: {
                    1024: {
                        perPage: 3,

                    },
                    590: {
                        perPage: 2
                    },
                    500 :{
                        perPage: 1
                    }
                },

                autoplay: false,
                pagination: false,
                perMove: 1,
                perPage: 3,
                gap: '40px',
                // type: 'loop',
                pauseOnHover: false,

            }}
                              extensions={{Grid}}

            >
                {posts.map(post => <SplideSlide key={post.id}>
                    <NewsItem post={post}/>
                </SplideSlide>)}
            </Splide>}
        </div>
    );
}

export default News;
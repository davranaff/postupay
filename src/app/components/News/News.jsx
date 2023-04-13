import style from './news.module.css'
import NewsItem from "@/app/components/News/NewsItem";
import {useEffect, useState} from "react";
import axios from "axios";
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';
import {useTranslation} from "react-i18next";


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
            {posts && <CarouselProvider className={style.newsContent} naturalSlideWidth={30}

                                        naturalSlideHeight={40}
                                        totalSlides={posts.length}
                                        interval={10000}
                                        isPlaying={true}
                                        infinite={true}
                                        visibleSlides={3}>
                <Slider>
                    {posts.map(post => <Slide index={post.id}>
                        <NewsItem post={post}/>
                    </Slide>)}
                </Slider>
                <ButtonBack className={style.prev}><img src="/icons/arrow.svg" alt=""/></ButtonBack>
                <ButtonNext className={style.next}><img src="/icons/arrow.svg" alt=""/></ButtonNext>
            </CarouselProvider>}
        </div>
    );
}

export default News;
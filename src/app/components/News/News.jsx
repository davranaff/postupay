import style from './news.module.css'
import NewsItem from "@/app/components/News/NewsItem";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {useEffect, useState} from "react";
import axios from "axios";


function News(props) {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        axios.get('https://education07.pythonanywhere.com/api/news/')
            .then(res => setPosts(res.data))
            .catch(err => console.error(err))
    }, [])
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

                {posts ? posts.map(post => (
                    <SplideSlide key={post.id}>
                        <NewsItem post={post}/>
                    </SplideSlide>
                )) : 'No posts'
                }
            </Splide>
        </div>
    );
}

export default News;
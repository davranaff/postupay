import style from './news.module.css'
import NewsItem from "@/app/components/News/NewsItem";
import Slider from 'src/infinite-react-carousel'


function News(props) {
    return (
        <div className={style.main}>
            <h1 className={style.title}>Новости</h1>
            <div className={style.newsContent}>
                <Slider slidesToShow={3} arrows={false} pauseOnHover={false} adaptiveHeight={true} autoplay={true}>
                    <NewsItem/>
                    <NewsItem/>
                    <NewsItem/>
                    <NewsItem/>
                </Slider>
            </div>
        </div>
    );
}

export default News;
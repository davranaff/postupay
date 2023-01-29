import style from './news.module.css'
import NewsItem from "@/app/components/News/NewsItem";

function News(props) {
    return (
        <div className={style.main}>
            <h1 className={style.title}>Новости</h1>
            <div className={style.newsContent}>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
            </div>
        </div>
    );
}

export default News;
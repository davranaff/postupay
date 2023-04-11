import style from './news.module.css'

function NewsItem({post}) {
    return (
        <div className={style.newsItem}>
            <img className={style.newsItem__image} src={'example.jpeg'}  alt={'example.png'}/>
            <div className={style.newsItem__content}>
                <div className={style.newsItem__content_title}>
                    <span>
                         {post.translations.ru.title}
                    </span>
                </div>
                <div className={style.newsItem__content_subtitle}>
                         {post.translations.ru.description}
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
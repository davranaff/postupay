import style from './news.module.css'
import i18n from "i18next";
import {mainUrlFiles} from "@/app/services/base";

function NewsItem({post}) {
    return (
        <div className={style.newsItem}>
            {post.image ? <img className={style.newsItem__image} src={mainUrlFiles + post.image} alt={'example.png'}/>: ""}
            <div className={style.newsItem__content}>
                <div className={style.newsItem__content_title}>
                    <span>
                         {post.translations[i18n.language] &&post.translations[i18n.language].title}
                    </span>
                </div>
                <div className={style.newsItem__content_subtitle}>
                         {post.translations[i18n.language] &&post.translations[i18n.language].description}
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
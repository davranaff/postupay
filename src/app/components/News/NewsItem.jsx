import style from './news.module.css'
import Image from "next/image";

function NewsItem() {
    return (
        <div className={style.newsItem}>
            <img className={style.newsItem__image} src={'example.jpeg'}  alt={'example.png'}/>
            <div className={style.newsItem__content}>
                <div className={style.newsItem__content_title}>
                    <span>
                         В школах и вузах вводят каникулы до 16 января
                    </span>
                </div>
                <div className={style.newsItem__content_subtitle}>
                    В Узбекистане регионы один за другим
                    переносят открытие школ и вузов на
                    16 января. В Хорезме, Бухаре, Фергане,
                    Андижане и Каракалпактсане начала учебы
                    уже перенесли на понедельник.
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
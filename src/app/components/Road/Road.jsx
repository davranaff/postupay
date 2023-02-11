import style from './road.module.css'
import {useState} from "react";

function Road(props) {
    const data = [
        {id: 1, title: 'Выберите специальность', active: false},
        {id: 2, title: 'Выберите ВУЗ', active: false},
        {id: 3, title: 'Подайте заявление о приеме в ВУЗ', active: false},
        {id: 4, title: 'Сдайте вступительные испытания', active: false},
        {id: 5, title: 'Подайте заявление о согласии', active: false},
        {id: 6, title: 'Принесите оригиналы документов', active: false},
        {id: 7, title: 'Оплатите контракт', active: false},
        {id: 8, title: 'Поздравляем Вы зачислены', active: false},
    ]

    const [items, setItems] = useState(data)

    return (
        <div className={style.main}>
            <h1 className={style.title}>Путь поступления в вуз</h1>
            <div className={style.content}>
                <img src="other/pathTop.png" className={style.pathTop} alt=""/>
                <img src="other/pathBottom.png" className={style.pathBottom} alt=""/>
                { items.map( value => <RoadItem key={value.id} item={value} update={setItems} /> ) }
            </div>
        </div>
    );
}


function RoadItem({ item }) {

    return (
        <div className={`${style.roadItem} ${item.active ? style.roadItem__active : ''}`}>
            <div className={style.roadItem__circle}>
                {item.id}
            </div>
            <p className={style.roadItem__title}>{item.title}</p>
        </div>
    );
}


export default Road
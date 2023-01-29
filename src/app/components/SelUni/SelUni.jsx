import style from './seluni.module.css'
import {useState} from "react";


function SelUni() {
    const initialState = [
        {
            id: 1,
            title: 'Государственные ВУЗы',
            checked: false
        },
        {
            id: 2,
            title: 'Иностранные ВУЗы',
            checked: false
        },
        {
            id: 3,
            title: 'Частные ВУЗы',
            checked: false
        }
    ]
    const [list, setList] = useState(initialState)


    return (
        <div className={style.main}>
            {list.map(value => <Check key={value.id} check={value} setList={setList}/>)}
        </div>
    );
}


function Check({check, setList}) {
    const handleState = () => {
        setList(prevState => prevState.map(value => {
            if (value.id === check.id) return {...value, checked: !value.checked}
            return {...value, checked: false}
        }))
    }
    return (
        <label className={`${style.item} ${check.checked && style.item__active}`} onClick={handleState}>
            <span>{check.title}</span>
        </label>
    );
}

export default SelUni;

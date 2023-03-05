import React, {useState} from 'react';
import style from "@/pages/profile/profile.module.css";
import Image from "next/image";
import ProfileResult from "@/app/components/Profile/ProfileResult";
import ProfileSaves from "@/app/components/Profile/ProfileSaves";

function Profile() {
    const [data, setData] = useState({
        results: [],
        saves: [],
    })
    const [checkout, setCheckout] = useState(false)

    return (
        <>
            <div className={style.profileInfo}>
                <div className={style.profileName}>
                    Иванов Иван
                </div>
                <div className={style.profileId}>
                    <p>ID: 12747282</p>
                    <button className={style.button} onClick={_ => setCheckout(!checkout)}>{!checkout ? 'Сохраненные ВУЗы' : 'Тестирование'}</button>
                </div>
            </div>
            <h1 className={style.result}>{
                !checkout ? 'Результаты тестирования:' : 'Сохраненные ВУЗы:'
            }</h1>
            {
                !checkout ? <ProfileResult results={data.results}/> : <ProfileSaves saves={data.saves}/>
            }
        </>
    );
}

export default Profile;
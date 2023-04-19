import React, {useEffect, useState} from 'react';
import style from "@/pages/profile/profile.module.css";
import Image from "next/image";
import {auth} from "@/app/services/auth/auth";
import i18n from "@/i18n";

function ProfileResult() {
    const [data, setData] = useState([])

    useEffect(_ => {
          auth.getResultProfile(localStorage.getItem('Authorization'))
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {data.length > 0 ? data.map(value => {
                const ball = Math.floor(100 * (value.score / (value.test_subject_histories.length / 4)))
                return <div className={style.blockTest}>
                <div className={style.progress} key={value.id}>
                    <div className={style.backGround} style={
                        {
                            width: `${ball}%`,
                            backgroundColor: ball < 60 && '#F4DCD6'
                        }
                    }>
                        <div className={style.wave1}></div>
                        <div className={style.wave2}></div>
                    </div>
                    <Image src={'/icons/check.svg'} alt={'check'} width={0} height={0}/>
                    <div className={style.progressContent}>
                        <h2>Тест: {value.university.title[i18n.language] && value.university.title[i18n.language] }</h2>
                        <p>{value.subject.title[i18n.language] && value.subject.title[i18n.language]}</p>
                    </div>
                    <h1>{ball}%</h1>
                </div>
            </div>
            }) : <ul style={{listStyleType: "none"}}>
                <li>У Вас пока нет пройденных тестов :(</li>
            </ul>}
        </>
    );
}

export default ProfileResult;
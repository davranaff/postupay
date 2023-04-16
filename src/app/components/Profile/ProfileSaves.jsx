import React, {useEffect, useState} from 'react';
import style from "@/app/components/Filter/result/filterresult.module.css";
import Link from "next/link";
import Image from "next/image";
import {auth} from "@/app/services/auth/auth";
import i18n from "@/i18n";

function ProfileSaves({ saves }) {
    const [data, setData] = useState([])

    useEffect(_ => {
          auth.getFavourites(localStorage.getItem('Authorization'))
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={style.resultContent}>
            {saves.length === 0 ? data.map(value => <Link href={`university/${value.university.id}`} key={value}>
                <div className={style.filterItem}>
                    <Image src={value.university.image ? value.university.image: '/icons/logo.svg'} alt={'example'} width={0} height={0}
                           className={style.filterItemImg}/>
                    <div className={style.filterItemContent}>
                        <h3 className={style.filterItemContentTitle}>
                            {value.university.title[i18n.language]}
                        </h3>
                        <p className={style.filterItemDescription}>
                            {value.university.address[i18n.language]}
                        </p>

                        <p className={style.filterItemContentSubtitle}>
                            {/*{value.university.address[i18n.language]}*/}
                        </p>
                    </div>
                </div>
            </Link>) : <span>У Вас пока нет сохраненных вузов :(</span>}
        </div>
    );
}

export default ProfileSaves;
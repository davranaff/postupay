import React from 'react';
import style from "@/app/components/Filter/result/filterresult.module.css";
import Link from "next/link";
import Image from "next/image";

function ProfileSaves({ saves }) {
    return (
        <div className={style.resultContent}>
            {saves.length === 0 ? <Link href={`university/1}`} key={1}>
                <div className={style.filterItem}>
                    <Image src={'/other/ban.png'} alt={'example'} width={0} height={0}
                           className={style.filterItemImg}/>
                    <div className={style.filterItemContent}>
                        <h3 className={style.filterItemContentTitle}>
                            Ташкентский филиал Российского Экономического Университета им. Г.В. Плеханова
                        </h3>
                        <p className={style.filterItemContentSubtitle}>
                            Город Ташкент
                        </p>
                    </div>
                </div>
            </Link> : <span>У Вас пока нет сохраненных вузов :(</span>}
        </div>
    );
}

export default ProfileSaves;
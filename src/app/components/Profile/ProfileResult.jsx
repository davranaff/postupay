import React from 'react';
import style from "@/pages/profile/profile.module.css";
import Image from "next/image";

function ProfileResult(props) {
    return (
        <>
            <div className={style.blockTest}>
                <div className={style.progress}>
                    <div className={style.backGround} style={{width: '95%'}}>
                        <div className={style.wave1}></div>
                        <div className={style.wave2}></div>
                    </div>
                    <Image src={'/icons/check.svg'} alt={'check'} width={0} height={0}/>
                    <div className={style.progressContent}>
                        <h2>Тест: Ташкентский филиал Российского Экономического Университета им. Г.В. Плеханова</h2>
                        <p>Русский | Математика</p>
                    </div>
                    <h1>95%</h1>
                </div>
            </div>
            <div className={style.blockTest}>
                <div className={style.progress}>
                    <div className={style.backGround} style={{
                        width: '25%',
                        backgroundColor: '#F4DCD6'
                    }}>
                        <div className={style.wave1}></div>
                        <div className={style.wave2}></div>
                    </div>
                    <Image src={'/icons/check.svg'} alt={'check'} width={0} height={0}/>
                    <div className={style.progressContent}>
                        <h2>Тест: Ташкентский филиал Российского Экономического Университета им. Г.В. Плеханова</h2>
                        <p>Русский | Математика</p>
                    </div>
                    <h1>25%</h1>
                </div>
            </div>
        </>
    );
}

export default ProfileResult;
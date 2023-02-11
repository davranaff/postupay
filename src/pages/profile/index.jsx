import style from './profile.module.css'
import Image from "next/image";
import React from "react";

function Index(props) {
    return (
        <div className={style.profile}>
            <div className={style.profileContent}>
                <div className={style.profileInfo}>
                    <div className={style.profileName}>
                        Иванов Иван
                    </div>
                    <div className={style.profileId}>
                        <p>Изменить профиль</p>
                        <p>ID: 12747282</p>
                    </div>
                </div>
                <h1 className={style.result}>Результаты тестирования:</h1>
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
                            <div className={style.wave1} style={{backgroundColor: '#F4DCD6'}}></div>
                            <div className={style.wave2} style={{backgroundColor: '#F4DCD6'}}></div>
                        </div>
                        <Image src={'/icons/check.svg'} alt={'check'} width={0} height={0}/>
                        <div className={style.progressContent}>
                            <h2>Тест: Ташкентский филиал Российского Экономического Университета им. Г.В. Плеханова</h2>
                            <p>Русский | Математика</p>
                        </div>
                        <h1>25%</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getStaticProps() {

    return {
        props: {}
    }
}

export default Index;
import React, {useContext} from 'react';
import Link from "next/link";
import Input from "@/app/UI/input/Input";
import Button from "@/app/UI/Button/Button";
import SignUpForm from "@/app/components/SignUpForm/SignUpForm";
import style from './signup.module.css'
import {useTranslation} from "react-i18next";


function Index(props) {
    const {t} = useTranslation()

    return (
        <div className={style.main}>
            <div className={style.content}>
                <h1 className={style.title}>{t('sign.signup')}</h1>
                <p className={style.subtitle}>{t('sign.has_account')} <Link href={'signin/'}>{t('home.navbar.sign_in')}</Link></p>
                <SignUpForm>
                    <Input nameOfInput={t('sign.name')} type={'text'} name={'first_name'}/>
                    <Input nameOfInput={t('sign.surname')} type={'text'} name={'last_name'}/>
                    <Input nameOfInput={t('sign.email')} type={'email'} name={'email'}/>
                    <Input nameOfInput={t('sign.password')} type={'password'} name={'password'}/>
                    <Input nameOfInput={t('sign.c_password')} type={'password'} name={'re_password'}/>
                    <Button text={t('sign.signup')} />
                </SignUpForm>
            </div>
        </div>
    );
}

export function getServerSideProps() {

  return { props: {} }
}

export default Index;
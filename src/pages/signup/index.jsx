import React from 'react';
import Link from "next/link";
import Input from "@/app/UI/input/Input";
import Button from "@/app/UI/Button/Button";
import SignUpForm from "@/app/components/SignUpForm/SignUpForm";
import style from './signup.module.css'

function Index(props) {
    return (
        <div className={style.main}>
            <div className={style.content}>
                <h1 className={style.title}>Регистрация</h1>
                <p className={style.subtitle}>Уже есть аккаунт? <Link href={'signin/'}>Войти</Link></p>
                <SignUpForm>
                    <Input nameOfInput={'Имя'} type={'text'} name={'first_name'}/>
                    <Input nameOfInput={'Фамилия'} type={'text'} name={'last_name'}/>
                    <Input nameOfInput={'Эл. Почта'} type={'email'} name={'email'}/>
                    <Input nameOfInput={'Создайте пароль'} type={'password'} name={'password'}/>
                    <Input nameOfInput={'Подтвердите пароль'} type={'password'} name={'password2'}/>
                    <Button text={'Регистрация'}/>
                </SignUpForm>
            </div>
        </div>
    );
}

export function getServerSideProps() {

  return { props: {} }
}

export default Index;
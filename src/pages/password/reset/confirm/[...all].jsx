import React, {useState} from 'react';
import {auth} from "@/app/services/auth/auth";
import style from './password.module.css'
import {AiTwotoneEye, AiTwotoneEyeInvisible} from "react-icons/ai";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";




function Input ({placeholder, value, setValue}) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <label className={style.label}>
            <input
                type={showPassword ? 'text' :"password"}
                className={style.input}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
                value={value}
            />
            {!showPassword ?
                <AiTwotoneEye color="#6C6F82" onClick={() => setShowPassword(true)}/> :
                <AiTwotoneEyeInvisible color="#6C6F82" onClick={() => setShowPassword(false)}/>}
        </label>
    )
}


function Index(props) {
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const {t} = useTranslation()
    const router = useRouter()
    const confirm = (e) =>{
        e.preventDefault()
        if (password.length < 8) {
            toast.error(t('toasts.password8'))
        }  else {
            if (password === cPassword) {
                auth.resetConfirmPassword(props.uid, props.token, password).then(res => {
                    toast.success(t("toasts.reset_password"))
                    router.push('/signin')

                }).catch(err => toast.error(err.response.data.new_password[0]))
            } else {
                toast.error(t("toasts.password_doesnt"))
            }
        }
    }

    return (
        <div className={style.main}>
            <div className={style.content}>
                <div className={style.title}>{t('sign.forgot')}</div>
                <div className={style.subtitle}>{t('sign.say_password')}</div>
                <form action="password" onSubmit={confirm}>
                    <Input placeholder={t('sign.new_password')} value={password} setValue={setPassword}/>
                    <Input placeholder={t('sign.c_password')} value={cPassword} setValue={setCPassword}/>
                    <button className={style.button}>{t('home.navbar.sign_in')}</button>
                </form>
            </div>
        </div>
    )
        ;
}

export async function getServerSideProps(context) {
    const uid = context.params.all[0]
    const token = context.params.all[1]
    return {
        props: {
            uid, token
        },
    }
}

export default Index
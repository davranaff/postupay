import React, {useState} from 'react';
import {auth} from "@/app/services/auth/auth";
import style from './password.module.css'
import {AiTwotoneEye, AiTwotoneEyeInvisible} from "react-icons/ai";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";




function Input ({placeholder, value, setValue}) {
    const [showPassword, setShowPassword] = useState(false)
    console.log(showPassword)
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
    const router = useRouter()
    const confirm = (e) =>{
        e.preventDefault()
        if (password.length < 8) {
            toast.error('Пароль должен содержать минимум 8 символ')
        }  else {
            if (password === cPassword) {
                auth.resetConfirmPassword(props.uid, props.token, password).then(res => {
                    toast.success('Вы успешно сбросили пароль!')
                    router.push('/signin')

                }).catch(err => toast.error(err.response.data.new_password[0]))
            } else {
                toast.error('Пароли не совпадают!')
            }
        }
    }

    return (
        <div className={style.main}>
            <div className={style.content}>
                <div className={style.title}>Забыли пароль</div>
                <div className={style.subtitle}>Придумайте новый пароль</div>
                <form action="password" onSubmit={confirm}>
                    <Input placeholder="Новый пароль" value={password} setValue={setPassword}/>
                    <Input placeholder="Подтвердите пароль" value={cPassword} setValue={setCPassword}/>
                    <button className={style.button}>Войти</button>
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
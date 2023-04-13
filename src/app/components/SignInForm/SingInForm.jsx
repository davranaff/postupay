import React, {useState} from 'react';
import style from './signinform.module.css'
import {SignInContext} from "@/app/context/SignInContext";
import {auth, authHead} from '@/app/services/auth/auth'
import {useBaseContext} from "@/app/context/BaseContext";
import {setCookie} from "@/app/utils/cookies";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {decodeToken } from "@/app/utils/jwtDecode"
import {useTranslation} from "react-i18next";

function SingInForm({children}) {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState(null)
    const {setUser} = useBaseContext()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {t} = useTranslation()


    async function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)
        const formData = {}
        data.forEach(value => {
            formData[value.name] = value.value
        })
        try {
            const res = await auth.login(formData).then(res => res).catch(e => toast.error(e.response.data.detail))
            if (res.status === 200) {
                router.push('/')
                
                setIsLoading(false)
                res.data.active = true
                localStorage.setItem('tokens', JSON.stringify(res.data))
                setCookie('access', res.data.access)
                setUser(res.data)
                const head = new Headers()
                head.set('Authorization', res.data.access)
                localStorage.setItem('Authorization', `Bearer ${res.data.access}`)

                authHead.auth = localStorage.getItem('Authorization')
                setSuccess(true)
                toast.success(t("toasts.entered"))
                // console.log(decodeToken(res.data.access))
                auth.getProfile(`Bearer ${res.data.access}`).then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data))
                })

            }
        } catch (e) {
            setIsLoading(false)
        }
        setIsLoading(false)

    }

    return (
        <SignInContext.Provider value={{data, setData, success, isLoading, setIsLoading}}>
            <form onSubmit={handleSubmit} className={style.main}>
                {...children}
            </form>
        </SignInContext.Provider>
    );
}

export default SingInForm;
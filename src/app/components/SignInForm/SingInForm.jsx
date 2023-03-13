import React, {useState} from 'react';
import style from './signinform.module.css'
import {SignInContext} from "@/app/context/SignInContext";
import {auth} from '@/app/services/auth/auth'
import {useBaseContext} from "@/app/context/BaseContext";
import {setCookie} from "@/app/utils/cookies";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

function SingInForm({children}) {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState(null)
    const {setUser} = useBaseContext()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        const formData = {}
        data.forEach(value => {
            formData[value.name] = value.value
        })
        try {
            const res = await auth.login(formData).then(res => res)
            if (res.status === 200) {
                setIsLoading(false)
                res.data.active = true
                localStorage.setItem('tokens', JSON.stringify(res.data))
                setCookie('access', res.data.access)
                setUser(res.data)
                const head = new Headers()
                head.set('Authorization', res.data.access)
                localStorage.setItem('Authorization', `Bearer ${res.data.access}`)
                setSuccess(true)
                toast.success('Вы успешно вошли в Аккаунт')
                router.push('/')
            }
        } catch (e) {
            toast.error(e.response.data.detail)
            setIsLoading(false)
        }

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
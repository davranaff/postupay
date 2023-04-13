import React, {useEffect, useState} from 'react';
import style from './signupform.module.css'
import {SignUpContext} from "@/app/context/SignUpContext";
import {auth} from "@/app/services/auth/auth";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

function SingUpForm({children}) {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState(null)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {t} = useTranslation()

    useEffect( _ => {
        success === true && router.push('/signin')

    }, [success] )


    async function handleSubmit(e) {
        setIsLoading(true)
        e.preventDefault()
        const formData = {}
        data.forEach(value => {
            formData[value.name] = value.value
        })
        if (formData.password === formData.re_password) {
            const res = await auth.register(formData).then(
            res => {
                toast.success(t('toasts.check_email'))
                setSuccess(true)
                setIsLoading(false)
            }
        ).catch(error => {
                setSuccess(false)
                if (error.response.data.email && error.response.data.password) {
                    toast.error(t("toasts.already_has"))
                    toast.error(t('toasts.password_err'))
                } else if (error.response.data.email) {
                    toast.error(t('toasts.already_has'))
                } else if (error.response.data.password) {
                    toast.error(t("toasts.password_err"))
                } else {
                    toast.error(t("toasts.something"))
                }
                setIsLoading(false)
            })
            return
        }
        toast.error(t("toasts.password_doesnt"))
        setIsLoading(false)
    }


    return (
        <SignUpContext.Provider value={{data, setData, success, isLoading,setIsLoading}}>
            <form onSubmit={handleSubmit} className={style.main}>
                {...children}
            </form>
        </SignUpContext.Provider>
    );
}

export default SingUpForm;
import React, {useEffect, useState} from 'react';
import style from './signupform.module.css'
import {SignUpContext} from "@/app/context/SignUpContext";
import {auth} from "@/app/services/auth/auth";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

function SingInForm({children}) {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState(null)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

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
                toast.success('Подтвердите почту!')
                setSuccess(true)
                setIsLoading(false)
            }
        ).catch(error => {
                setSuccess(false)
                if (error.response.data.email && error.response.data.password) {
                    toast.error('Данный Email адрес уже существует')
                    toast.error('Ненадёжный пароль!')
                } else if (error.response.data.email) {
                    toast.error('Данный Email адрес уже существует')
                } else if (error.response.data.password) {
                    toast.error('Ненадёжный пароль!')
                } else {
                    toast.error('Что-то пошло не так!')
                }
                setIsLoading(false)
            })
            return
        }
        toast.error('Пароли не совпадают')
    }

    return (
        <SignUpContext.Provider value={{data, setData, success, isLoading,setIsLoading}}>
            <form onSubmit={handleSubmit} className={style.main}>
                {...children}
            </form>
        </SignUpContext.Provider>
    );
}

export default SingInForm;
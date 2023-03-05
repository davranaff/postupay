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

    useEffect( _ => {
        success === true && router.push('/signin')
    }, [success] )

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = {}
        data.forEach(value => {
            formData[value.name] = value.value
        })
        if (formData.password === formData.password2) {
            delete formData.password2
            const res = await auth.register(formData)
            if (res.status === 201) {
                toast.success('Вы успешно прошли регистрацию')
                setSuccess(true)
                return
            }
            toast.error('Данный Email адрес уже существует')
            setSuccess(false)
            return
        }
        toast.error('Пароли не совпадают')
    }

    return (
        <SignUpContext.Provider value={{data, setData, success}}>
            <form onSubmit={handleSubmit} className={style.main}>
                {...children}
            </form>
        </SignUpContext.Provider>
    );
}

export default SingInForm;
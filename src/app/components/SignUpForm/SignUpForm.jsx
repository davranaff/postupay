import React, {useState} from 'react';
import style from './signupform.module.css'
import {SignUpContext} from "@/app/context/SignUpContext";
import {auth} from "@/app/services/auth/auth";

function SingInForm({children}) {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        const formData = {}
        data.forEach(value => {
            formData[value.name] = value.value
        })
        if (formData.password === formData.password2) {
            delete formData.password2
            try {
                const res = auth.register(formData)
                setSuccess(true)
                return null
            } catch (e) {
                console.log(e)
                setSuccess(false)
                return null
            }
        }
        alert('пароли не совпадают')
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
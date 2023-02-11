import React, {useState} from 'react';
import style from './signinform.module.css'
import {SignInContext} from "@/app/context/SignInContext";
import {auth} from '@/app/services/auth/auth'

function SingInForm({ children }) {
    const [ data, setData] = useState([])
    const [success, setSuccess] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        const formData = {}
        data.forEach( value => {formData[value.name] = value.value})
        const res = auth.login(formData)
        console.log(res)
    }

    return (
        <SignInContext.Provider value={ {data, setData, success} }>
            <form onSubmit={handleSubmit} className={style.main}>
                {...children}
            </form>
        </SignInContext.Provider>
    );
}

export default SingInForm;
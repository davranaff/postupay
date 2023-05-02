import React, {useContext, useEffect, useState} from 'react';
import style from "@/pages/profile/profile.module.css";
import ProfileResult from "@/app/components/Profile/ProfileResult";
import ProfileSaves from "@/app/components/Profile/ProfileSaves";
import {auth} from "@/app/services/auth/auth";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {universities} from "@/app/services/universities/universites";
import {BiEdit} from "react-icons/bi";
import Modal from "@/app/components/Modal/Modal";
import {UserContext} from "@/app/context/BaseContext";
import axios from "axios";
import {useTranslation} from "react-i18next";

function Profile({check}) {


    const [data, setData] = useState({
        results: [],
        saves: [],
    })
    const [checkout, setCheckout] = useState(check)
    const router = useRouter()
    const [userInfo, setUserInfo] = useState(null)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState(userInfo && !edit ? userInfo.first_name : "")
    const [surname, setSurname] = useState(userInfo && !edit ? userInfo.last_name : "")
    const [token, setToken] = useState(null)
    const {customer, setCustomer} = useContext(UserContext)
    const {t} = useTranslation()

    const editProfile = e => {
        e.preventDefault()
        if (name && surname) {
            axios.put(`https://education07.pythonanywhere.com/auth/users/me/`, {
                first_name: name,
                last_name: surname,
            }, {
                headers: {
                    'Authorization': `${token && token}`
                }
            })
                .then((res) => {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    setShowModal(false)
                    toast.success(t('toasts.all_right'))
                    setCustomer(JSON.parse(localStorage.getItem('user')))
                    setName('')
                    setSurname('')
                    load()
                })
        } else {
            toast.warn(t("toasts.write_something"))
        }


    }


    useEffect(_ => {
        if (JSON.parse(localStorage.getItem("user"))) {
            axios.get(`https://education07.pythonanywhere.com/auth/users/me/`, {
                headers: {
                    'Authorization': localStorage.getItem('Authorization')
                }
            }).then(res => {
                setUserInfo(res.data)
                if (localStorage.getItem("id")) {
                    setId(localStorage.getItem("id"))
                    return
                }
                localStorage.setItem("id", Math.floor(Math.random() * 99999))
            })
            setToken(localStorage.getItem('Authorization'))
            return
        }
        router.push('/')
    }, [])

    return (
        <>
            <div className={style.profileInfo}>
                <div className={style.profileName}>
                    {userInfo && !edit ? `${userInfo.first_name} ${userInfo.last_name}` : "Иванов Иван"} &nbsp; <BiEdit
                    onClick={() => setShowModal(true)}/>
                </div>
                <div className={style.profileId}>
                    <p>ID: {userInfo && id}</p>
                    <button className={style.button}
                            onClick={_ => setCheckout(!checkout)}>{!checkout ? t('home.navbar.saved') : t('profile.test')}</button>
                </div>
            </div>
            <h1 className={style.result}>{
                !checkout ? t('profile.result_test') : t('home.navbar.saved')
            }</h1>
            <div className={style.content}>
                {
                    !checkout ? <ProfileResult/> : <ProfileSaves saves={data.saves}/>
                }
            </div>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <h1>Изменить профиль</h1>
                <form onSubmit={e => editProfile(e)}>
                    <input
                        type="text"
                        className={style.input}
                        placeholder={userInfo && !edit ? userInfo.first_name : "Иван"}
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type="text"
                        className={style.input}
                        placeholder={userInfo && !edit ? userInfo.last_name : "Иванов"}
                        onChange={e => setSurname(e.target.value)}
                        value={surname}
                    />

                    <button className={style.button}>Применить</button>
                </form>
            </Modal>
        </>
    );
}

export default Profile;
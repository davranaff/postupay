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

function Profile({check}) {


    const [data, setData] = useState({
        results: [],
        saves: [],
    })
    const [checkout, setCheckout] = useState(check)
    const router = useRouter()
    const [userInfo, setUserInfo] = useState(null)
    const [edit, setEdit] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState(userInfo && !edit ? userInfo.first_name : "")
    const [surname, setSurname] = useState(userInfo && !edit ? userInfo.last_name : "")
    const [token, setToken] = useState(null)
    const {customer, setCustomer} = useContext(UserContext)

    const editProfile = e => {
        e.preventDefault()
        console.log(token)
      if (name && surname) {
          axios.put(`https://education07.pythonanywhere.com/auth/users/me/`, {
              first_name: name,
              last_name: surname,
          }, {
              headers : {
                  'Authorization': `${token && token}`
              }
          })
              .then((res) => {
                  localStorage.setItem('user', JSON.stringify(res.data))
                  setShowModal(false)
                  toast.success('Вы успешно изменили профиль')
                  setCustomer(JSON.parse(localStorage.getItem('user')))
                  setName('')
                  setSurname('')
                  load()
              })
      } else {
          toast.warn('Write something')
      }


    }
    const load = () => {
        auth.getProfile(
            localStorage.getItem('Authorization')
        ).then(res => {setUserInfo(res.data)}).catch(err => {toast.warn('У вас нету доступа!')})
        universities.getFavourites(localStorage.getItem('Authorization'))
            .then(res => console.log(res.data)).catch(err => {
                if (!localStorage.getItem('Authorization')) {
                    toast.warn('У вас нету доступа!')
                }
        })
    }
    useEffect(_ => {
        setToken(localStorage.getItem('Authorization'))
        load()
    }, [])

    return (
        <>
            <div className={style.profileInfo}>
                <div className={style.profileName}>
                    {userInfo && !edit ? `${userInfo.first_name} ${userInfo.last_name}` : "Иванов Иван"} &nbsp; <BiEdit onClick={() => setShowModal(true)}/>
                </div>
                <div className={style.profileId}>
                    <p>ID: {userInfo && userInfo.id}</p>
                    <button className={style.button}
                            onClick={_ => setCheckout(!checkout)}>{!checkout ? 'Сохраненные ВУЗы' : 'Тестирование'}</button>
                </div>
            </div>
            <h1 className={style.result}>{
                !checkout ? 'Результаты тестирования:' : 'Сохраненные ВУЗы:'
            }</h1>
            {
                !checkout ? <ProfileResult results={data.results}/> : <ProfileSaves saves={data.saves}/>
            }
            <Modal open={showModal} onClose={() =>setShowModal(false)}>
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
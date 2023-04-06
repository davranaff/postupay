import Input from "@/app/UI/input/Input";
import style from './signin.module.css'
import SingInForm from "@/app/components/SignInForm/SingInForm";
import Button from "@/app/UI/Button/Button";
import Link from "next/link";
import Modal from "@/app/components/Modal/Modal";
import {useState} from "react";
import { useTranslation} from 'react-i18next'
import axios from "axios";
import {toast} from "react-toastify";


function Index(props) {
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState('')
    const {t} = useTranslation()
    const sendEmail = e => {
        e.preventDefault()
        axios.post('https://education07.pythonanywhere.com/auth/users/reset_password/ ', {
            email: email
        })
            .then(res => {
                console.log(res)
                setShowModal(false)
                toast.success('Check your email')
            })
            .catch(err => console.error(err))
    }

    return (
        <div className={style.main}>
            <div className={style.content}>
                <h1 className={style.title}>{t('home.navbar.sign_in')}</h1>
                <p className={style.subtitle}>{t('sign.no_account')} <Link href={'signup/'}>{t('sign.signup')} </Link>
                    {t('sign.less_minute')} </p>
                <SingInForm>
                    <Input nameOfInput={t('sign.email')}  type={'email'} name={'email'}/>
                    <Input nameOfInput={t('sign.password')}  type={'password'} name={'password'}/>
                    <p className={style.forgot} onClick={() => setShowModal(true)}>{t('sign.forgot')} </p>
                    <Button text={t('home.navbar.sign_in')} />

                </SingInForm>
            </div>

            <Modal text="Enter your email" onClose={() => setShowModal(false)} open={showModal}>
                <h1 className={style.title}>{t('sign.enter_email')}:</h1>
                <form  onSubmit={e => sendEmail(e)}>
                    <input type="email" className={style.input} placeholder={t('sign.email')}
                           onChange={(e) =>setEmail(e.target.value)}
                           value={email}
                    />
                    <button className={style.button}>{t('sign.submit')}</button>
                </form>
            </Modal>
        </div>
    );
}

export default Index;


export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}
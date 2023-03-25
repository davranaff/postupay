import Input from "@/app/UI/input/Input";
import style from './signin.module.css'
import SingInForm from "@/app/components/SignInForm/SingInForm";
import Button from "@/app/UI/Button/Button";
import Link from "next/link";
import Modal from "@/app/components/Modal/Modal";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";


function Index(props) {
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState('')
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
                <h1 className={style.title}>Вход</h1>
                <p className={style.subtitle}>Нет аккаунта? <Link href={'signup/'}>Зарегистрироваться</Link> это займет
                    меньше минуты</p>
                <SingInForm>
                    <Input nameOfInput={'Эл. Почта'} type={'email'} name={'email'}/>
                    <Input nameOfInput={'Пароль'} type={'password'} name={'password'}/>
                    <p className={style.forgot} onClick={() => setShowModal(true)}>Забыли пароль?</p>
                    <Button text={'Войти'}/>

                </SingInForm>
            </div>

            <Modal text="Enter your email" onClose={() => setShowModal(false)} open={showModal}>
                <h1 className={style.title}>Enter your email</h1>
                <form  onSubmit={e => sendEmail(e)}>
                    <input type="email" className={style.input} placeholder="Эл. Почта"
                           onChange={(e) =>setEmail(e.target.value)}
                           value={email}
                    />
                    <button className={style.button}>Submit</button>
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
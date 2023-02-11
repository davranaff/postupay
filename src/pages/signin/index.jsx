import Input from "@/app/UI/input/Input";
import style from './signin.module.css'
import SingInForm from "@/app/components/SignInForm/SingInForm";
import Button from "@/app/UI/Button/Button";
import Link from "next/link";

function Index(props) {
    return (
        <div className={style.main}>
            <div className={style.content}>
                <h1 className={style.title}>Вход</h1>
                <p className={style.subtitle}>Нет аккаунта? <Link href={'signup/'}>Зарегистрироваться</Link> это займет меньше минуты</p>
                <SingInForm>
                    <Input nameOfInput={'Эл. Почта'} type={'email'} name={'email'}/>
                    <Input nameOfInput={'Пароль'} type={'password'} name={'password'}/>
                    <Button text={'Войти'}/>
                </SingInForm>
            </div>
        </div>
    );
}

export default Index;

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}
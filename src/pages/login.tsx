import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import {useState} from "react";
import {authApi} from "../store/services/authService.ts";
import {useNavigate} from "react-router-dom";
import Container from "../components/Container.tsx";

const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isError, setIsError] = useState<string>("")

    const [getToken] = authApi.useGetTokenMutation()
    const [loginUser] = authApi.useLoginUserMutation()

    const navigate = useNavigate()

    const loginHandler = () => {
        if (username.trim().length > 0 && password.trim().length > 0) {
            getToken(
                {username, password}
            ).then((res: any) => {
                    console.log(res)
                    if (res.error) {
                        setIsError('HTTP Error: ' + res.error.status)
                    } else if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        loginUser(res.data.token).then((res: any) => {
                            if (res.error) {
                                setIsError('HTTP Error: ' + res.error.status)
                            } else {
                                navigate('/cases')
                            }
                        })
                    }
                }
            )
        }
    }

    return (
        <Container>
            <div className={'w-1/3 mx-auto pt-44'}>
                <h1 className={"w-4/5 mx-auto text-2xl font-bold text-center mb-3"}>Панель администратора</h1>
                <h1 className={"mx-auto opacity-80 text-center mb-10"}>Чтобы продолжить войдите в свой
                    аккаунт</h1>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <Input auth={true} title={'Почта'} placeholder={"Имя пользователя"} value={username} setValue={setUsername}/>
                    </div>
                    <div className="">
                        <Input auth={true} title={'Пароль'} placeholder={"Пароль"} hiddenValue value={password} setValue={setPassword}/>
                    </div>
                    {
                        isError && <div
                            className={'bg-redOpacity text-red py-2 h-auto rounded-lg w-full text-center mt-3'}>{isError}</div>
                    }
                    <div className={"mt-3"}>
                        <Button handler={loginHandler} text={"Войти"}/>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default Login

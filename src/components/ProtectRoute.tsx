import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Nav from "./Nav.tsx";
import Container from "./Container.tsx";

type TProps = {
    children: React.ReactNode,
    authPage?: boolean
}
const ProtectRoute: React.FC<TProps> = ({authPage, children}) => {
    const token = localStorage.getItem('token')

    return (
        authPage ? token ? <AccessDenied/> : children : token ?
            (
                <div>
                    <Nav/>
                    <div className="mt-7">
                        <Container>
                            {children}
                        </Container>
                    </div>
                </div>
            ) : <AccessDenied/>
    )

    function AccessDenied() {
        const [timerValue, setTimerValue] = useState<number>(3)
        const navigate = useNavigate()

        const timer = setInterval(() => {
            setTimerValue(timerValue - 1)
            if (timerValue <= 1) {
                if (authPage) {
                    navigate('/users')
                } else {
                    navigate('/')
                }
            }
        }, 1000)

        setTimeout(() => {
            clearInterval(timer)
        }, 2000)

        return (
            <div className={'w-screen h-screen flex flex-col items-center justify-center'}>
                <div className="text-2xl text-red p-5 bg-redOpacity rounded-2xl">
                    Доступ запрещен
                </div>
                <div className="text-lg mt-5">Перенаправление через {timerValue} сек.</div>
            </div>
        )
    }
}
export default ProtectRoute

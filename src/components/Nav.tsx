import {NavLink, useNavigate} from "react-router-dom";
import Container from "./Container.tsx";

const Nav = () => {
    const navigate = useNavigate()
    const navLinks = [
        {
            navTitle: 'Кейсы',
            navHref: '/cases'
        },
        {
            navTitle: 'Скины',
            navHref: '/skins'
        },
        {
            navTitle: 'Пользователи',
            navHref: '/users'
        },
        {
            navTitle: 'Категории',
            navHref: '/categories'
        },
        {
            navTitle: 'VIP',
            navHref: '/vip'
        },
        {
            navTitle: 'YouTubers',
            navHref: '/youtubers'
        },
    ]

    const logout = () => {
        localStorage.setItem('token', '')
        navigate('/')
    }

    return (
        <div className={'mt-5'}>
            <Container>
                <div className="px-4 py-2 flex items-center justify-between bg-darkColor rounded-2xl">
                    <div className="text-xl font-semibold">
                        Админ-панель
                    </div>
                    <div className={'flex'}>
                        {
                            navLinks.map((el, index) => (
                                    <NavLink key={index} to={el.navHref}
                                             className={'cursor-pointer font-semibold px-3 flex items-center rounded-lg hover:bg-darkBg ml-4'}>
                                        {el.navTitle}
                                    </NavLink>
                                )
                            )
                        }
                        <div onClick={logout}
                             className={'cursor-pointer p-3 rounded-lg text-red font-semibold hover:bg-redOpacity ml-4'}>
                            Выйти
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default Nav

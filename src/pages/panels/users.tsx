import {usersApi} from "../../store/services/usersService.ts";
import {useLayoutEffect} from "react";
import Card from "../../components/Card.tsx";

const Users = () => {
    const token = localStorage.getItem('token') || ''
    const fetchUsers = usersApi.useGetUsersQuery(token).data?.users

    useLayoutEffect(() => {
        if (fetchUsers) {
            console.log(fetchUsers)
        }
    })

    return (
        <div>
            <h1 className={'text-xl font-semibold mb-3'}>Пользователи</h1>
            <div className="flex flex-wrap">
                {
                    fetchUsers && fetchUsers.map(el => (
                            <Card entityProps={'USERS'} key={el.id} userEntity={el} />
                        )
                    )
                }
            </div>
        </div>
    )
}
export default Users

import {usersApi} from "../../store/services/usersService.ts";
import Card from "../../components/Card.tsx";

const Users = () => {
    const token = localStorage.getItem('token') || ''
    const fetchUsers = usersApi.useGetUsersQuery(token).data?.users

    return (
        <div>
            <div className="flex justify-between">
                <h1 className={'text-xl font-semibold mb-3'}>Пользователи</h1>
                <h1 className={'text-lg opacity-70  mb-3'}>сортировка - сначала новые</h1>
            </div>
            <div className="flex flex-wrap">
                {
                    fetchUsers && fetchUsers.slice().reverse().map(el => (
                            <Card entityProps={'USERS'} key={el.id} userEntity={el} />
                        )
                    )
                }
            </div>
        </div>
    )
}
export default Users

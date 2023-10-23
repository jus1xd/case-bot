import React from "react";
import {IUser} from "../../models/IUser.ts";
import {usersApi} from "../../store/services/usersService.ts";
import Input from "../Input.tsx";
import moment from "moment/moment";
import Button from "../Button.tsx";

const UserCard: React.FC<{ token: string, data: IUser }> = ({token, data}) => {
    const [deleteUserById] = usersApi.useDeleteUserByIdMutation()

    const deleteHandler = () => {
        deleteUserById({token, id: data.id}).then(res => console.log(res))
    }

    console.log(data)

    return (
        <div>
            <div className="">
                <Input disabled title={'ID'} placeholder={'ID'} value={data.id.toString()}/>
                <Input disabled title={'Имя пользователя'} placeholder={'ID'} value={data.username.toString()}/>
                <Input disabled title={'Баланс'} placeholder={'ID'} value={data.balance.toString()}/>
                <Input disabled title={'Марсианинов'} placeholder={'ID'} value={data.marsians.toString()}/>
                <Input disabled title={'В бане'} placeholder={'ID'} value={data.is_banned ? 'Забанен' : 'Нет'}/>
                <Input disabled title={'REFs'} placeholder={'ID'} value={data.ref_counter.toString()}/>
                <Input disabled title={'VIP (Окончание подписки)'} placeholder={'ID'} value={moment(data.youtuber).format('DD.MM.YYYY HH:MM')}/>
                <Input disabled title={'Ютубер (Окончание подписки)'} placeholder={'ID'} value={moment(data.youtuber).format('DD.MM.YYYY HH:MM')}/>
            </div>
            <div className="mt-3">
                <Button handler={deleteHandler} text={'Удалить'} bgColor={'bg-red'}/>
            </div>
        </div>
    )
}

export default UserCard
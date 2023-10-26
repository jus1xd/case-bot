import React, {useState} from "react";
import {IUser} from "../../models/IUser.ts";
import {usersApi} from "../../store/services/usersService.ts";
import Input from "../Input.tsx";
import moment from "moment/moment";
import Button from "../Button.tsx";

const UserCard: React.FC<{ token: string, data: IUser }> = ({token, data}) => {
    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [id,] = useState<number>(data.id || 0)
    const [username, setUsername] = useState<string>(data.username)
    const [balance, setBalance] = useState<number>(data.balance)
    const [marsians, setMarsians] = useState<number>(data.marsians)
    const [isBanned, setIsBanned] = useState<boolean>(data.is_banned)
    const [vip, setVip] = useState<string>(data.vip)
    const [youtuber, setYoutuber] = useState<string>(data.youtuber)
    const [refCounter, setRefCounter] = useState<number>(data.ref_counter)

    const [deleteUserById] = usersApi.useDeleteUserByIdMutation()
    const [editUserById] = usersApi.useEditUserByIdMutation()

    const deleteHandler = () => {
        deleteUserById({token, id: data.id || -1}).then(res => console.log(res))
    }

    const saveChangesHandler = () => {
        editUserById({
            body:
                {
                    username,
                    balance,
                    marsians,
                    is_banned: isBanned,
                    vip,
                    youtuber,
                    ref_counter: refCounter
                }, token, id: data.id || 0
        })
        setEditingMode(false)
    }

    return (
        <div>
            <div className="">
                <Input disabled title={'ID'} placeholder={'ID'} value={id.toString()}/>
                <Input disabled={!editingMode} title={'Имя пользователя'} placeholder={'ID'} value={username} setValue={setUsername}/>
                <Input disabled={!editingMode} title={'Баланс'} placeholder={'ID'} value={balance} setValue={setBalance}/>
                <Input disabled={!editingMode} title={'Марсианинов'} placeholder={'ID'} value={marsians} setValue={setMarsians}/>
                <Input disabled={!editingMode} title={'В бане'} placeholder={'ID'} value={isBanned ? 'Забанен' : 'Нет'} setValue={setIsBanned}/>
                <Input disabled={!editingMode} title={'REFs'} placeholder={'ID'} value={refCounter} setValue={setRefCounter}/>
                <div className="mt-2">
                    <div className="mb-1 text-sm">VIP (Окончание подписки)</div>
                    {editingMode ? (
                        <input type={'date'} disabled={!editingMode} title={'VIP (Окончание подписки)'} placeholder={'ID'}
                               value={vip} onChange={(e) => setVip(e.target.value)}/>
                    ) : (
                        <Input disabled placeholder={'ID'}
                               value={editingMode ? vip : moment(vip).format('DD.MM.YYYY HH:MM')}/>
                    )}
                </div>
                <div className="mt-2">
                    <div className="mb-1 text-sm">Ютубер (Окончание подписки)</div>
                    {editingMode ? (
                        <input type={'date'} disabled={!editingMode} title={'Ютубер (Окончание подписки)'} placeholder={'ID'}
                               value={youtuber} onChange={(e) => setYoutuber(e.target.value)}/>
                    ) : (
                        <Input disabled placeholder={'ID'}
                               value={editingMode ? youtuber : moment(youtuber).format('DD.MM.YYYY HH:MM')}/>
                    )}
                </div>
            </div>
            <div className="mt-3">
                {
                    editingMode ?
                        <Button handler={saveChangesHandler} text={'Сохранить'} bgColor={'bg-accentColor mb-2'}/> :
                        <Button handler={() => setEditingMode(true)} text={'Изменить'} bgColor={'bg-accentColor mb-2'}/>
                }
                <Button handler={deleteHandler} text={'Удалить'} bgColor={'bg-red'}/>
            </div>
        </div>
    )
}

export default UserCard
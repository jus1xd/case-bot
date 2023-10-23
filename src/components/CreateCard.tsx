import React from 'react'
import Button from "./Button.tsx";
import {usersApi} from "../store/services/usersService.ts";
import {skinsApi} from "../store/services/skinsService.ts";
import {casesApi} from "../store/services/casesService.ts";
import {ICase} from "../models/ICase.ts";
import {IUser} from "../models/IUser.ts";
import {ISkin} from "../models/ISkin.ts";
import Input from "./Input.tsx";
import moment from "moment";

type TProps = {
    entityProps: string,
    caseEntity?: ICase,
    userEntity?: IUser,
    skinEntity?: ISkin,
}

const СreateCard: React.FC<TProps> = ({entityProps, caseEntity, skinEntity, userEntity}) => {
    const token = localStorage.getItem('token') || ''

    return (
        <div className={'w-[calc(25%-16px)] mr-4 min-w-[220px] relative bg-darkColor p-3 rounded-xl overflow-hidden'}>
            {
                entityProps === 'CASES' ? (
                    caseEntity && <CaseCard token={token} data={caseEntity}/>
                ) : entityProps === 'SKINS' ? (
                    skinEntity && <SkinCard token={token} data={skinEntity}/>
                ) : (
                    userEntity && <UserCard token={token} data={userEntity}/>
                )
            }
        </div>
    )
}

const CaseCard: React.FC<{ token: string, data: ICase }> = ({token, data}) => {
    const [deleteCaseById] = casesApi.useDeleteCaseByIdMutation()

    const deleteHandler = () => {
        deleteCaseById({token, id: data.id}).then(res => console.log(res))
    }

    return (
        <div>
            <div className="">
                <div className="rounded-lg overflow-hidden mb-2">
                    <img src={data.image} alt=""/>
                </div>
                <Input disabled title={'ID'} placeholder={'ID'} value={data.id.toString()}/>
                <Input disabled title={'Название'} placeholder={'ID'} value={data.name.toString()}/>
                <Input disabled title={'Цена'} placeholder={'ID'} value={data.price.toString()}/>
                <Input disabled title={'Скины IDs'} placeholder={'ID'} value={data.skins[0].id}/>
            </div>
            <div className="mt-3">
                <Button handler={deleteHandler} text={'Удалить'} bgColor={'bg-red'}/>
            </div>
        </div>
    )
}

const SkinCard: React.FC<{ token: string, data: ISkin }> = ({token, data}) => {
    const [deleteSkinById] = skinsApi.useDeleteSkinByIdMutation()

    const deleteHandler = () => {
        deleteSkinById({token, id: data.id}).then(res => console.log(res))
    }

    return (
        <div>
            <div className="">
                <div className="rounded-lg overflow-hidden mb-2">
                    <img src={data.image} alt=""/>
                </div>
                <Input disabled title={'ID'} placeholder={'ID'} value={data.id.toString()}/>
                <Input disabled title={'Название'} placeholder={'ID'} value={data.name.toString()}/>
                {
                    data.price && <Input disabled title={'Цена'} placeholder={'ID'} value={data.price.toString()}/>
                }
                <Input disabled title={'Цвет'} placeholder={'ID'} value={data.color}/>
                {
                    data.chance && <Input disabled title={'Шанс'} placeholder={'ID'} value={data.chance.toString()}/>
                }
            </div>
            <div className="mt-3">
                <Button handler={deleteHandler} text={'Удалить'} bgColor={'bg-red'}/>
            </div>
        </div>
    )
}

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

export default СreateCard

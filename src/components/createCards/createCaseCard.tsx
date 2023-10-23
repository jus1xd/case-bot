import React, {useState} from "react";
import {ICase} from "../../models/ICase.ts";
import {casesApi} from "../../store/services/casesService.ts";
import Input from "../Input.tsx";
import Button from "../Button.tsx";

const CreateCaseCard: React.FC<{ token: string, data: ICase }> = ({token}) => {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [deleteCaseById] = casesApi.useDeleteCaseByIdMutation()

    const createHandler = () => {
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
                <Input disabled title={'Скины IDs'} placeholder={'ID'} value={data.skins[0].id.toString()}/>
            </div>
            <div className="mt-3">
                <Button handler={deleteHandler} text={'Удалить'} bgColor={'bg-red'}/>
            </div>
        </div>
    )
}

export default CreateCaseCard
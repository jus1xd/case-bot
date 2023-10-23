import React from "react";
import {ISkin} from "../../models/ISkin.ts";
import {skinsApi} from "../../store/services/skinsService.ts";
import Input from "../Input.tsx";
import Button from "../Button.tsx";

const CreateSkinCard: React.FC<{ token: string, data: ISkin }> = ({token, data}) => {
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

export default CreateSkinCard
import React, {useState} from "react";
import {ISkin} from "../../models/ISkin.ts";
import {skinsApi} from "../../store/services/skinsService.ts";
import Input from "../Input.tsx";
import Button from "../Button.tsx";

const SkinCard: React.FC<{ token: string, data: ISkin }> = ({token, data}) => {
    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [image, setImage] = useState<File | string | null>(data.image)
    const [name, setName] = useState<string>(data.name)
    const [price, setPrice] = useState<number>(data.price || 0)
    const [color, setColor] = useState<string>(data.color)
    const [chance, setChance] = useState<number>(data.chance || 0)

    const [editSkinById] = skinsApi.useEditSkinByIdMutation()
    const [deleteSkinById] = skinsApi.useDeleteSkinByIdMutation()

    const deleteHandler = () => {
        deleteSkinById({token, id: data.id}).then(res => console.log(res))
    }

    const saveChangesHandler = () => {
        if (image && name.trim() && price.toString().trim()) {
            const fd = new FormData()
            if (!image.toString().includes('http')) {
                 fd.append('image', image)
            }
            fd.append('name', name.toString())
            fd.append('price', price.toString())
            fd.append('color', color.toString())
            fd.append('chance', chance.toString())
            editSkinById({body: fd, token, id: data.id})
            setEditingMode(false)
        }
    }

    return (
        <div>
            <div className="">
                <div className="rounded-lg overflow-hidden mb-2 h-[170px] object-contain">
                    <img src={data.image} alt="" className={'object-contain h-full'}/>
                </div>
                <Input disabled title={'ID'} placeholder={'ID'} value={data.id.toString()}/>
                <Input disabled={!editingMode} title={'Название'} placeholder={'Название'} value={name} setValue={setName}/>
                {
                    data.price &&
                    <Input disabled={!editingMode} title={'Цена'} placeholder={'Цена'} value={price} setValue={setPrice}/>
                }
                <Input disabled={!editingMode} title={'Цвет'} placeholder={'Цвет'} value={color} setValue={setColor}/>
                {
                    data.chance &&
                    <Input disabled={!editingMode} title={'Шанс'} placeholder={'Шанс'} value={chance} setValue={setChance}/>
                }
            </div>
            <div className="mt-3">
                {
                    editingMode &&
                    <input type={'file'} className={'mb-3'} onChange={(e) => setImage(e.target.files![0])}/>
                }
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

export default SkinCard
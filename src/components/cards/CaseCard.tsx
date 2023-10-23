import React, {useState} from "react";
import {ICase} from "../../models/ICase.ts";
import {casesApi} from "../../store/services/casesService.ts";
import Input from "../Input.tsx";
import Button from "../Button.tsx";

const CaseCard: React.FC<{ token: string, data: ICase }> = ({token, data}) => {
    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [image, setImage] = useState<File | string | null>(data.image)
    const [name, setName] = useState<string>(data.name)
    const [price, setPrice] = useState<number>(data.price)

    const [deleteCaseById] = casesApi.useDeleteCaseByIdMutation()
    const [editCaseById] = casesApi.useEditCaseByIdMutation()

    const deleteHandler = () => {
        deleteCaseById({token, id: data.id}).then(res => console.log(res))
    }

    const saveChangesHandler = () => {
        if (image && name.trim() && price.toString().trim()) {
            const fd = new FormData()
            fd.append('image', image)
            fd.append('name', name)
            fd.append('price', price.toString())
            editCaseById({body: fd, token, id: data.id})
            setEditingMode(false)
        }
    }

    return (
        <div>
            <div className="">
                <div className="rounded-lg overflow-hidden mb-2">
                    <img src={data.image} alt=""/>
                </div>
                <Input disabled title={'ID'} placeholder={'ID'} value={data.id.toString()}/>
                <Input disabled={!editingMode} title={'Название'} placeholder={'ID'} value={name} setValue={setName}/>
                <Input disabled={!editingMode} title={'Цена'} placeholder={'ID'} value={price} setValue={setPrice}/>
                <Input disabled={!editingMode} title={'Скины IDs'} placeholder={'ID'} value={data.skins[0].id.toString()}/>
            </div>
            <div className="mt-3">
                {
                    editingMode && <input type={'file'} className={'mb-3'} onChange={(e) => setImage(e.target.files![0])}/>
                }
                {
                    editingMode ? <Button handler={saveChangesHandler} text={'Сохранить'} bgColor={'bg-accentColor mb-2'}/> : <Button handler={() => setEditingMode(true)} text={'Изменить'} bgColor={'bg-accentColor mb-2'}/>
                }
                <Button handler={deleteHandler} text={'Удалить'} bgColor={'bg-red'}/>
            </div>
        </div>
    )
}

export default CaseCard
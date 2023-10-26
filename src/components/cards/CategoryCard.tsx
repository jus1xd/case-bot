import React, {useState} from "react";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import {ICategory} from "../../models/ICategory.ts";
import {categoriesApi} from "../../store/services/categoriesService.ts";

const CategoryCard: React.FC<{ token: string, data: ICategory }> = ({token, data}) => {
    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [name, setName] = useState<string>(data.name)

    const [deleteCategoryById] = categoriesApi.useDeleteCategoryByIdMutation()
    const [editCategoryById] = categoriesApi.useEditCategoryByIdMutation()

    const deleteHandler = () => {
        deleteCategoryById({token, id: data.id || 0}).then(res => console.log(res))
    }

    const saveChangesHandler = () => {
        if (name.trim()) {
            editCategoryById({body: {name}, id: data.id || 0, token})
            setEditingMode(false)
        }
    }

    console.log('some')

    return (
        <div>
            <div className="">
                <Input disabled title={'ID'} placeholder={'ID'} value={data.id ? data.id.toString() : 0}/>
                <Input disabled={!editingMode} title={'Название'} placeholder={'ID'} value={name} setValue={setName}/>
            </div>
            <div className="mt-3">
                {
                    editingMode ? <Button handler={saveChangesHandler} text={'Сохранить'} bgColor={'bg-accentColor mb-2'}/> : <Button handler={() => setEditingMode(true)} text={'Изменить'} bgColor={'bg-accentColor mb-2'}/>
                }
                <Button handler={deleteHandler} text={'Удалить'} bgColor={'bg-red'}/>
            </div>
        </div>
    )
}

export default CategoryCard
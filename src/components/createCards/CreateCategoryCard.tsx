import React, { useState} from "react";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import {categoriesApi} from "../../store/services/categoriesService.ts";

const CreateCategoryCard: React.FC<{ token: string }> = ({token}) => {
    const [id, setId] = useState<number>(0)
    const [name, setName] = useState<string>('')

    const [createCategory] = categoriesApi.useCreateCategoryMutation()

    const createHandler = () => {
        if (name.trim()
            && id.toString().trim()
        ) {
            createCategory({token, body: {id, name}}).then(() => {
                setId(0)
                setName('')
            })
        }
    }

    return (
        <div className={'h-max'}>
            <div className="">
                <Input title={'ID'} placeholder={'ID'} value={id} setValue={setId}/>
                <Input title={'Название'} placeholder={'Название'} value={name} setValue={setName}/>
            </div>
            <div className="mt-5">
                <Button handler={createHandler} text={'Создать'}/>
            </div>
        </div>
    )
}

export default CreateCategoryCard
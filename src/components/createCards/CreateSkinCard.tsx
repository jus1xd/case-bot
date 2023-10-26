import React, { useState} from "react";
import {skinsApi} from "../../store/services/skinsService.ts";
import Input from "../Input.tsx";
import Button from "../Button.tsx";

const CreateSkinCard: React.FC<{ token: string }> = ({token}) => {
    const [image, setImage] = useState<File | null>(null)
    const [id, setId] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [color, setColor] = useState<string>('')
    const [chance, setChance] = useState<number>(0)

    const [createSkin] = skinsApi.useCreateSkinMutation()

    const createHandler = () => {
        if (image &&
            name.trim()
            && id.toString().trim()
            && price.toString().trim()
            && color.toString().trim()
            && chance.toString().trim()
        ) {
            const fd = new FormData()
            fd.append('image', image)
            fd.append('id', id.toString())
            fd.append('name', name)
            fd.append('price', price.toString())
            fd.append('color', color.toString())
            fd.append('chance', chance.toString())

            createSkin({token, body: fd}).then(() => {
                setId(0)
                setImage(null)
                setName('')
                setPrice(0)
                setChance(0)
                setColor('')
            })
        }
    }

    return (
        <div className={'h-max'}>
            <div className="">
                <div className="rounded-lg overflow-hidden mb-2 h-[170px]">
                    {
                        image ? <label htmlFor="casePhoto"><img className={'cursor-pointer'}
                                                                src={URL.createObjectURL(image)} alt=""/></label> :
                            <label htmlFor={'casePhoto'}
                                   className={'w-full cursor-pointer h-full bg-darkBg flex items-center justify-center'}><span
                                className={'opacity-60'}>Загрузите картинку</span></label>
                    }
                </div>
                <Input title={'ID'} placeholder={'ID'} value={id} setValue={setId}/>
                <Input title={'Название'} placeholder={'Название'} value={name} setValue={setName}/>
                <Input title={'Цена'} placeholder={'Цена'} value={price} setValue={setPrice}/>
                <Input title={'Цвет'} placeholder={'Цвет'} value={color} setValue={setColor}/>
                <Input title={'Шанс'} placeholder={'Шанс'} value={chance} setValue={setChance}/>
            </div>
            <div className="mt-5">
                <input id={'casePhoto'} type={'file'} className={'appearance-none hidden mb-3'}
                       onChange={(e) => setImage(e.target.files![0])}/>
                <Button handler={createHandler} text={'Создать'}/>
            </div>
        </div>
    )
}

export default CreateSkinCard
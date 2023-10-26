import React, {useRef, useState} from "react";
import {casesApi} from "../../store/services/casesService.ts";
import Input from "../Input.tsx";
import Button from "../Button.tsx";

type TProps = {
    token: string,
}

const CreateCaseCard: React.FC<TProps> = ({token}) => {
    const skinsArrayRef = useRef<any>('')
    const [image, setImage] = useState<File | null>(null)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(50)
    const [category, setCategory] = useState<number>(1)

    const [createCase] = casesApi.useCreateCaseMutation()

    const createHandler = () => {
        let skinsArrayValue = skinsArrayRef.current.value
        console.log(skinsArrayValue)
        if (image &&
            name.trim()
            && price.toString().trim()
            && skinsArrayValue
        ) {
            const fd = new FormData()
            fd.append('image', image)
            fd.append('name', name)
            fd.append('price', price.toString())
            fd.append('category', category.toString())

            for (let char in skinsArrayValue) {
                fd.append('skins', skinsArrayValue[char])
            }

            createCase({token, body: fd}).then(() => {
                setCategory(0)
                setImage(null)
                setName('')
                setPrice(0)
                skinsArrayValue = ''
            })
        }
    }

    return (
        <div className={'h-max'}>
            <div className="">
                <div className="rounded-lg overflow-hidden mb-2 h-[105px]">
                    {
                        image ? <label htmlFor="casePhoto"><img className={'cursor-pointer'}
                                                                src={URL.createObjectURL(image)} alt=""/></label> :
                            <label htmlFor={'casePhoto'}
                                   className={'w-full cursor-pointer h-full bg-darkBg flex items-center justify-center'}><span
                                className={'opacity-60'}>Загрузите картинку</span></label>
                    }
                </div>
                <Input title={'Название'} placeholder={'Название'} value={name} setValue={setName}/>
                <Input title={'Цена'} placeholder={'Цена'} value={price} setValue={setPrice}/>
                <Input title={'Категория'} placeholder={'Категория'} value={category} setValue={setCategory}/>
                <input className={'mt-3 placeholder:text-sm w-full py-1 px-4 outline-none rounded-lg bg-[#D3CAFF1A]'}
                       placeholder={'SkinID без пробелов'} ref={skinsArrayRef} type="number"/>
            </div>
            <div className="mt-5">
                <input id={'casePhoto'} type={'file'} className={'appearance-none hidden mb-3'}
                       onChange={(e) => setImage(e.target.files![0])}/>
                <Button handler={createHandler} text={'Создать'}/>
            </div>
        </div>
    )
}

export default CreateCaseCard
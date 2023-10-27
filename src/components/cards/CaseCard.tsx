import React, {useEffect, useRef, useState} from "react";
import {ICase} from "../../models/ICase.ts";
import {casesApi} from "../../store/services/casesService.ts";
import Input from "../Input.tsx";
import Button from "../Button.tsx";

const CaseCard: React.FC<{ token: string, data: ICase }> = ({token, data}) => {
  const skinsArrayRef = useRef<any>('')
  const skinsArrayValue = skinsArrayRef.current.value
  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [image, setImage] = useState<File | string | null>(data.image)
  const [name, setName] = useState<string>(data.name)
  const [price, setPrice] = useState<number>(data.price)
  const [marsians, setMarsians] = useState<number>(data.marsians)
  const [skinsID, setSkinsID] = useState<string>('')

  const [deleteCaseById] = casesApi.useDeleteCaseByIdMutation()
  const [editCaseById] = casesApi.useEditCaseByIdMutation()

  useEffect(() => {
    let skins: string = ''
    data.skins.map(el => {
      skins = skins + ',' + el.id
    })
    setSkinsID(skins.slice(1))
  }, [])

  const deleteHandler = () => {
    deleteCaseById({token, id: data.id})
  }

  function stringToArray(numbersString: string): number[] {
    // Разделение строки на числа с помощью метода split()
    const numbersArray: string[] = numbersString.split(',');

    // Преобразование каждого элемента массива в числовой тип данных
    const parsedNumbers: number[] = numbersArray.map((num) => parseInt(num));

    return parsedNumbers;
  }

  const saveChangesHandler = () => {
    if (image && name.trim() && price.toString().trim()) {
      const result = stringToArray(skinsArrayValue);

      const fd = new FormData()
      fd.append('image', image)
      fd.append('name', name)
      fd.append('price', price.toString())
      fd.append('marsians', marsians.toString())
      result.map(el => fd.append('skins', el.toString()))
      editCaseById({body: fd, token, id: data.id})
      setEditingMode(false)
    }
  }

  return (
    <div>
      <div className="">
        <div className="rounded-lg overflow-hidden mb-2 h-[105px]">
          <img src={data.image} alt=""/>
        </div>
        <Input disabled title={'ID'} placeholder={'ID'} value={data.id.toString()}/>
        <Input disabled={!editingMode} title={'Название'} placeholder={'Название'} value={name}
               setValue={setName}/>
        <Input disabled={!editingMode} title={'Цена'} placeholder={'Цена'} value={price} setValue={setPrice}/>
        <Input disabled={!editingMode} title={'Марсианинов'} placeholder={'Марсианинов'} value={marsians} setValue={setMarsians}/>
        <div className="text-sm mt-2">Скины</div>
        <input disabled={!editingMode}
               className={'mt-1 placeholder:text-sm w-full py-1 px-4 outline-none rounded-lg bg-[#D3CAFF1A]'}
               placeholder={'SkinID через запятую'} value={skinsID} onChange={(e) => setSkinsID(e.target.value)}
               ref={skinsArrayRef}
               type="text"/>
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

export default CaseCard
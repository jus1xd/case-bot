import React, {useState} from "react";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import {IYoutuber} from "../../models/IYoutuber.ts";
import {youtuberApi} from "../../store/services/youtuberService.ts";

const YoutuberCard: React.FC<{ token: string, data: IYoutuber }> = ({token, data}) => {
    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(data.counter)
    const [sale, setSale] = useState<number>(data.sale)
    const [marsians, setMarsians] = useState<number>(data.marsians)

    const [editYoutuber] = youtuberApi.useEditYoutuberMutation()

    const saveChangesHandler = () => {
        editYoutuber({
            token, body: {
                counter,
                sale,
                marsians,
            }
        }).then(() => setEditingMode(false))
    }

    return (
        <div>
            <div className="">
                {/*<Input disabled title={'ID'} placeholder={'ID'} value={data.id.toString()}/>*/}
                <Input disabled={!editingMode} title={'Счетчик'} placeholder={'Счетчик'} value={counter}
                       setValue={setCounter}/>
                <Input disabled={!editingMode} title={'Скидка'} placeholder={'Скидка'} value={sale}
                       setValue={setSale}/>
                <Input disabled={!editingMode} title={'Марсианинов'} placeholder={'Марсианинов'} value={marsians}
                       setValue={setMarsians}/>
            </div>
            <div className="mt-3">
                {
                    editingMode ?
                        <Button handler={saveChangesHandler} text={'Сохранить'} bgColor={'bg-accentColor mb-2'}/> :
                        <Button handler={() => setEditingMode(true)} text={'Изменить'} bgColor={'bg-accentColor mb-2'}/>
                }
            </div>
        </div>
    )
}

export default YoutuberCard
import React, {useState} from "react";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import {IVip} from "../../models/IVip.ts";
import {vipApi} from "../../store/services/vipService.ts";

const VipCard: React.FC<{ token: string, data: IVip }> = ({token, data}) => {
    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [price1D, setPrice1D] = useState<number>(data.price_1d)
    const [price7D, setPrice7D] = useState<number>(data.price_7d)
    const [price30D, setPrice30D] = useState<number>(data.price_30d)
    const [sale, setSale] = useState<number>(data.sale)
    const [persentSendMarsians, setPersentSendMarsians] = useState<number>(data.persent_send_marsians)

    const [editVip] = vipApi.useEditVipMutation()

    const saveChangesHandler = () => {
        editVip({
            token, body: {
                price_1d: price1D,
                price_7d: price7D,
                price_30d: price30D,
                sale,
                persent_send_marsians: persentSendMarsians,
            }
        }).then(() => setEditingMode(false))

    }

    return (
        <div>
            <div className="">
                {/*<Input disabled title={'ID'} placeholder={'ID'} value={data.id.toString()}/>*/}
                <Input disabled={!editingMode} title={'Цена за 1 день'} placeholder={'Цена за 1 день'} value={price1D}
                       setValue={setPrice1D}/>
                <Input disabled={!editingMode} title={'Цена за 7 дней'} placeholder={'Цена за 7 дней'} value={price7D}
                       setValue={setPrice7D}/>
                <Input disabled={!editingMode} title={'Цена за 30 дней'} placeholder={'Цена за 30 дней'}
                       value={price30D}
                       setValue={setPrice30D}/>
                <Input disabled={!editingMode} title={'Скидка'} placeholder={'Скидка'} value={sale}
                       setValue={setSale}/>
                <Input disabled={!editingMode} title={'PersentSendMarsians'} placeholder={'PersentSendMarsians'}
                       value={persentSendMarsians}
                       setValue={setPersentSendMarsians}/>
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

export default VipCard
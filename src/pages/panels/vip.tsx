import {vipApi} from "../../store/services/vipService.ts";
import {useEffect} from "react";
import Card from "../../components/Card.tsx";

const Vip = () => {
    const token = localStorage.getItem('token') || ''
    const fetchVip = vipApi.useGetVipQuery(token)

    useEffect(() => {
        console.log(fetchVip)
    }, [fetchVip]);

    return (
        <div>
            <div className="flex justify-between">
                <h1 className={'text-xl font-semibold mb-3'}>VIP</h1>
            </div>
            <div className="flex flex-wrap">
                { fetchVip.data && <Card entityProps={'VIP'} vipEntity={fetchVip.data.vip}/>}
            </div>
        </div>
    )
}
export default Vip

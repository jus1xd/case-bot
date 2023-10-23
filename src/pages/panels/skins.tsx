import {useLayoutEffect} from "react";
import Card from "../../components/Card.tsx";
import {skinsApi} from "../../store/services/skinsService.ts";

const Skins = () => {
    const token = localStorage.getItem('token') || ''
    const fetchSkins = skinsApi.useGetSkinsQuery(token).data?.skins || []

    useLayoutEffect(() => {
        if (fetchSkins) {
            console.log(fetchSkins)
        }
    })

    return (
        <div>
            <h1 className={'text-xl font-semibold mb-3'}>Скины</h1>
            <div className="flex flex-wrap">
                {
                    fetchSkins && fetchSkins.map(el => (
                            <Card entityProps={'SKINS'} key={el.id} skinEntity={el} />
                        )
                    )
                }
            </div>
        </div>
    )
}
export default Skins

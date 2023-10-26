import Card from "../../components/Card.tsx";
import {skinsApi} from "../../store/services/skinsService.ts";
import CreateCard from "../../components/CreateCard.tsx";

const Skins = () => {
    const token = localStorage.getItem('token') || ''
    const fetchSkins = skinsApi.useGetSkinsQuery(token).data?.skins || []

    return (
        <div>
            <div className="flex justify-between">
                <h1 className={'text-xl font-semibold mb-3'}>Скины</h1>
                <h1 className={'text-lg opacity-70  mb-3'}>сортировка - сначала новые</h1>
            </div>
            <div className="flex flex-wrap">
                <CreateCard entityProps={'SKINS'} />
                {
                    fetchSkins && fetchSkins.slice().reverse().map(el => (
                            <Card entityProps={'SKINS'} key={el.id} skinEntity={el} />
                        )
                    )
                }
            </div>
        </div>
    )
}
export default Skins

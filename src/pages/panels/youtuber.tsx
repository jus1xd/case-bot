import {useEffect} from "react";
import Card from "../../components/Card.tsx";
import {youtuberApi} from "../../store/services/youtuberService.ts";

const Youtuber = () => {
    const token = localStorage.getItem('token') || ''
    const fetchYoutuber = youtuberApi.useGetYoutuberQuery(token)

    useEffect(() => {
        console.log(fetchYoutuber)
    }, [fetchYoutuber]);

    return (
        <div>
            <div className="flex justify-between">
                <h1 className={'text-xl font-semibold mb-3'}>YOUTUBER</h1>
            </div>
            <div className="flex flex-wrap">
                { fetchYoutuber.data && <Card entityProps={'YOUTUBER'} youtuberEntity={fetchYoutuber.data.youtuber}/>}
            </div>
        </div>
    )
}
export default Youtuber

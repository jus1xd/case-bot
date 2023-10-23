import {useLayoutEffect} from "react";
import Card from "../../components/Card.tsx";
import {casesApi} from "../../store/services/casesService.ts";
import CreateCard from "../../components/CreateCard.tsx";

const Cases = () => {
    const token = localStorage.getItem('token') || ''
    const fetchCases = casesApi.useGetCasesQuery(token).data?.cases || []

    useLayoutEffect(() => {
        if (fetchCases) {
            console.log(fetchCases)
        }
    })

    return (
        <div>
            <h1 className={'text-xl font-semibold mb-3'}>Кейсы</h1>
            <div className="flex flex-wrap">
                {/*{*/}
                {/*    fetchCases[0] && <CreateCard entity={'CASES'} key={fetchCases[0].id} data={fetchCases[0]} />*/}
                {/*}*/}
                {
                    fetchCases && fetchCases.map(el => (
                            <Card entityProps={'CASES'} key={el.id} caseEntity={el} />
                        )
                    )
                }
            </div>
        </div>
    )
}
export default Cases

    import Card from "../../components/Card.tsx";
import {casesApi} from "../../store/services/casesService.ts";
import CreateCard from "../../components/CreateCard.tsx";

const Cases = () => {
    const token = localStorage.getItem('token') || ''
    const fetchCases = casesApi.useGetCasesQuery(token).data?.cases || []

    return (
        <div>
            <div className="flex justify-between">
                <h1 className={'text-xl font-semibold mb-3'}>Кейсы</h1>
                <h1 className={'text-lg opacity-70  mb-3'}>сортировка - сначала новые</h1>
            </div>
            <div className="flex justify-between flex-wrap">
                <CreateCard entityProps={'CASES'} />
                {
                    fetchCases && fetchCases.slice().reverse().map(el => (
                            <Card entityProps={'CASES'} key={el.id} caseEntity={el} />
                        )
                    )
                }
            </div>
        </div>
    )
}
export default Cases

import Card from "../../components/Card.tsx";
import CreateCard from "../../components/CreateCard.tsx";
import {categoriesApi} from "../../store/services/categoriesService.ts";
import {ICategory} from "../../models/ICategory.ts";

const Categories = () => {
    const token = localStorage.getItem('token') || ''
    const fetchCategories = categoriesApi.useGetCategoriesQuery(token).data?.categories || []

    return (
        <div>
            <div className="flex justify-between">
                <h1 className={'text-xl font-semibold mb-3'}>Категории</h1>
                <h1 className={'text-lg opacity-70  mb-3'}>сортировка - сначала новые</h1>
            </div>
            <div className="flex flex-wrap">
                <CreateCard entityProps={'CATEGORIES'} />
                {
                    fetchCategories && fetchCategories.slice().reverse().map((el: ICategory) => (
                            <Card entityProps={'CATEGORIES'} key={el.id} categoryEntity={el} />
                        )
                    )
                }
            </div>
        </div>
    )
}
export default Categories

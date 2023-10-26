import React from 'react'
import CreateCaseCard from "./createCards/CreateCaseCard.tsx";
import CreateSkinCard from "./createCards/CreateSkinCard.tsx";
import CreateCategoryCard from "./createCards/CreateCategoryCard.tsx";

type TProps = {
    entityProps: string,
}

const CreateCard: React.FC<TProps> = ({entityProps}) => {
    const token = localStorage.getItem('token') || ''

    return (
        <div className={'h-max w-[calc(25%-16px)] max-w-[calc(25%-16px)] z-10 mr-4 min-w-[260px] relative bg-darkColor p-3 rounded-xl overflow-hidden'}>
            {
                entityProps === 'CASES' ? (
                    <CreateCaseCard token={token} />
                ) : entityProps === 'SKINS' ? (
                    <CreateSkinCard token={token} />
                ) : entityProps === 'CATEGORIES' ? (
                    <CreateCategoryCard token={token} />
                ) : null
            }
        </div>
    )
}

export default CreateCard

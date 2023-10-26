import React from 'react'
import {ICase} from "../models/ICase.ts";
import {IUser} from "../models/IUser.ts";
import {ISkin} from "../models/ISkin.ts";
import CaseCard from "./cards/CaseCard.tsx";
import SkinCard from "./cards/SkinCard.tsx";
import UserCard from "./cards/UserCard.tsx";
import CategoryCard from "./cards/CategoryCard.tsx";
import {ICategory} from "../models/ICategory.ts";
import VipCard from "./cards/VipCard.tsx";
import {IVip} from "../models/IVip.ts";
import {IYoutuber} from "../models/IYoutuber.ts";
import YoutuberCard from "./cards/YoutuberCard.tsx";

type TProps = {
    entityProps: string,
    caseEntity?: ICase,
    userEntity?: IUser,
    skinEntity?: ISkin,
    categoryEntity?: ICategory,
    vipEntity?: IVip,
    youtuberEntity?: IYoutuber,
}

const Card: React.FC<TProps> = ({entityProps, caseEntity, skinEntity, userEntity, categoryEntity, vipEntity, youtuberEntity}) => {
    const token = localStorage.getItem('token') || ''

    return (
        <div className={'w-[calc(25%-16px)] min-w-[260px] h-max mr-4 first:ml-0 relative bg-darkColor p-3 rounded-xl mb-4 overflow-hidden'}>
            {
                entityProps === 'CASES' ? (
                    caseEntity && <CaseCard token={token} data={caseEntity}/>
                ) : entityProps === 'SKINS' ? (
                    skinEntity && <SkinCard token={token} data={skinEntity}/>
                ) : entityProps === 'CATEGORIES' ? (
                    categoryEntity && <CategoryCard token={token} data={categoryEntity}/>
                ) : entityProps === 'VIP' ? (
                    vipEntity && <VipCard token={token} data={vipEntity}/>
                ) : entityProps === 'YOUTUBER' ? (
                    youtuberEntity && <YoutuberCard token={token} data={youtuberEntity}/>
                ) : (
                    userEntity && <UserCard token={token} data={userEntity}/>
                )
            }
        </div>
    )
}

export default Card

import React from 'react'
import {ICase} from "../models/ICase.ts";
import {IUser} from "../models/IUser.ts";
import {ISkin} from "../models/ISkin.ts";
import CaseCard from "./cards/CaseCard.tsx";
import SkinCard from "./cards/SkinCard.tsx";
import UserCard from "./cards/UserCard.tsx";

type TProps = {
    entityProps: string,
    caseEntity?: ICase,
    userEntity?: IUser,
    skinEntity?: ISkin,
}

const Card: React.FC<TProps> = ({entityProps, caseEntity, skinEntity, userEntity}) => {
    const token = localStorage.getItem('token') || ''

    return (
        <div className={'w-[calc(25%-16px)] mr-4 min-w-[220px] relative bg-darkColor p-3 rounded-xl overflow-hidden'}>
            {
                entityProps === 'CASES' ? (
                    caseEntity && <CaseCard token={token} data={caseEntity}/>
                ) : entityProps === 'SKINS' ? (
                    skinEntity && <SkinCard token={token} data={skinEntity}/>
                ) : (
                    userEntity && <UserCard token={token} data={userEntity}/>
                )
            }
        </div>
    )
}




export default Card

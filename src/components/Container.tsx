import React from 'react'

type TProps = {
    children: React.ReactNode;
}
const Container: React.FC<TProps> = ({children}) => {
    return (
        <div className={"w-full max-w-[1176px] px-3 mx-auto"}>{children}</div>
    )
}
export default Container

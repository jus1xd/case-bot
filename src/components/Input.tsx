import React from 'react'

type TProps = {
    title?: string,
    placeholder: string,
    hiddenValue?: boolean,
    value: string | number,
    setValue?: (value: string | number, index?: number) => void,
    disabled?: boolean,
    auth?: boolean
}

const Input: React.FC<TProps> = ({auth, disabled, title, placeholder, hiddenValue, value, setValue}) => {
    return (
        <div>
            {
                title && <div className="text-sm mb-[6px] mt-2">{title}</div>
            }
            <input className={`w-full  ${auth ? 'py-3' : 'py-1'} px-4 outline-none rounded-lg bg-[#D3CAFF1A]`}
                   placeholder={placeholder}
                   value={value}
                   disabled={disabled}
                   type={hiddenValue ? "password" : "text"}
                   onChange={(e) => setValue ? setValue(e.target.value) : null}/>
        </div>

    )
}
export default Input

type TProps = {
    text: string,
    textColor?: string,
    bgColor?: string,
    handler?: () => void
}
const Button: React.FC<TProps> = ({text = 'Нажать', textColor = 'text-white', bgColor = 'bg-accentColor', handler}) => {
    return (
        <div onClick={handler}
             className={`cursor-pointer hover:opacity-100 opacity-80 transition-opacity w-full ${bgColor} rounded-lg ${textColor} text-center py-2 px-3 font-semibold`}>{text}</div>
    )
}
export default Button

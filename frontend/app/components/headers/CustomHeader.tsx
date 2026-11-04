
export default function CustomHeader({page, selected, onClick}: {page: string, selected: boolean, onClick?: () => void}) {
    const unselectedStyles = "h-1/3 pr-3 pl-3 cursor-pointer border-solid rounded-tr-md bg-gray-200 text-black hover:opacity-75"
    const selectedStyles = "h-1/3 pr-3 pl-3 border-solid rounded-tr-md bg-gray-600 text-black"
    return (
        <div
            onClick={onClick ? onClick : undefined}
            className={selected ? selectedStyles : unselectedStyles}>
            {page}
        </div>
    )
}
import CustomHeader from "~/components/headers/CustomHeader";

export default function FolderHeader({page, onClick}: {page: string, onClick: () => void}) {
    return (
        <CustomHeader page={page} selected={false} onClick={onClick}/>
    )
}
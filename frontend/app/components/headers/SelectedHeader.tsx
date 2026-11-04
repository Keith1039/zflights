import CustomHeader from "~/components/headers/CustomHeader";

export default function SelectedFolderHeader({page}: {page: string}) {
    return (
        <CustomHeader page={page} selected={true}/>
    )
}
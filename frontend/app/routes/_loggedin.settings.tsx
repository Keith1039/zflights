import {useState} from "react";
import SelectedFolderHeader from "~/components/headers/SelectedHeader";
import FolderHeader from "~/components/headers/FolderHeader";

type SettingSubPages = "general" | "email" | "other"


export default function () {
    const [subPage, setSubPage] = useState<SettingSubPages>("general");
    const pages: string[] = [
        "general",
        "email",
        "other"
    ]

    return (
        <div className="flex flex-col grow min-h-0 z-20 bg-white">
            <div className="flex flex-row w-full items-end">
                {pages.map((page) => (
                    page === subPage ? <SelectedFolderHeader page={page} /> : <FolderHeader page={page} onClick={() => setSubPage(page as SettingSubPages)} />
                ))}
            </div>
            <div className="grow w-full min-h-0 bg-gray-600">

            </div>
        </div>
    )
}
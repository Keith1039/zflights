import {useState} from "react";
import SelectedFolderHeader from "~/components/headers/SelectedHeader";
import FolderHeader from "~/components/headers/FolderHeader";
import GeneralSettingsForm, {generalFormAction } from "~/components/forms/GeneralSettingsForm";
import EmailSettingsForm, {emailFormAction} from "~/components/forms/EmailSettingsForm";
import OtherSettingsForm, {otherFormAction} from "~/components/forms/OtherSettingsForm";
import type { Route } from "../../.react-router/types/app/routes/+types/_loggedin.settings"


type SettingSubPages = "general" | "email" | "other"

export async function action({request}: Route.ActionArgs) {
    const formData = await request.formData();

    const form = formData.get("form");
    switch (form) {
        case "general":
            return generalFormAction(formData)
        case "email":
            return emailFormAction(formData)
        case "other":
            return otherFormAction(formData)
        default:
            return null
    }
}

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
                {(() => {
                    switch (subPage) {
                        case "general":
                            return <GeneralSettingsForm/>
                        case "email":
                            return <EmailSettingsForm/>
                        case "other":
                            return <OtherSettingsForm/>
                        default:
                            return <></>
                    }
                })()
                }
            </div>
        </div>
    )
}
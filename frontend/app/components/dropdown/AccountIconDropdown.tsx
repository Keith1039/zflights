import {links} from "~/root";
import AccountIcon from "~/components/AccountIcon";
import DropdownContainer, {type DropdownLinkProps} from "~/components/dropdown/DropdownContainer";
import {redirect} from "react-router";

const accountIconLinks: DropdownLinkProps[] = [
    {
        caption: "Log Out",
        action: () => {
            //do logout
            redirect("/")
        }
    }
]
export default function AccountIconDropdown() {

    return (
        <DropdownContainer links={accountIconLinks}>
            <AccountIcon/>
        </DropdownContainer>
    )
}
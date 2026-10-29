import AccountIcon from "~/components/AccountIcon";
import DropdownContainer, {type DropdownLinkProps} from "~/components/dropdown/DropdownContainer";
import {useNavigate} from "react-router";


export default function AccountIconDropdown() {
    const navigate = useNavigate();

    const accountIconLinks: DropdownLinkProps[] = [
        {
            caption: "Log Out",
            action: () => {
                //do logout
                return navigate("/");
            }
        }
    ]
    return (
        <DropdownContainer links={accountIconLinks}>
            <AccountIcon/>
        </DropdownContainer>
    )
}
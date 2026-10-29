import Navbar, {type LinkData} from "~/components/navbar/Navbar";

const defaultLinks: LinkData[] = [
    {
        text: "map",
        href: "/map"
    },
    {
        text: "available trips",
        href: "/deals"
    },
    {
        text: "settings",
        href: "/settings"
    }
]

export default function AuthedNavbar() {
    return <Navbar authed={true} links={defaultLinks}/>;
}
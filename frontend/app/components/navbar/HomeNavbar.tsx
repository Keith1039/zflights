import Navbar, {type LinkData} from "~/components/navbar/Navbar";

const defaultLinks: LinkData[] = [
    {
        text: "Home",
        href: "/"
    },
    {
        text: "About Us",
        href: "/about"
    },
    {
        text: "Contact Us",
        href: "/contact"
    }
]

export default function HomeNavbar() {
    return <Navbar authed={false} links={defaultLinks}/>;
}
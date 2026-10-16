import Logo from "~/components/Logo";
import PageLink from "~/components/navbar/PageLink";
import SignUpButton from "~/components/buttons/SignUpButton";
import LoginButton from "~/components/buttons/LoginButton";

export type LinkData = {
    text: string;
    href: string;
}

export type NavbarConfig = {
    auth?: boolean;
}

export default function Navbar({authed, links}: {authed: boolean, links: LinkData[]}) {
    // divided into 3 sections
    // logo section for logo
    // link section for website pages and links
    // icon section for the user account icon
    return (
        <div className="flex w-full h-[10dvh] min-h-20 justify-center items-center bg-transparent z-20">
            <div className="flex items-center min-w-9/10 h-8/10 transition duration-150 ease-in hover:bg-(--navbar-hover-color) rounded-md">
                <a href={authed ? "/loggedin" : "/"} className="flex justify-center min-w-1/8 h-full bg-transparent transition duration-150 ease-in hover:border">
                    <div>
                        <Logo/>
                    </div>
                </a>
                <div className="flex items-center justify-start min-w-1/2 w-8/10 h-full" >
                    {links.map((link) => (
                        <PageLink key={link.href} text={link.text} href={link.href}></PageLink>
                    ))}
                </div>
                { !authed && <div className="flex items-center justify-evenly min-w-1/8 max-w-1/8 h-full gap-2 mr-2">
                    <div className="h-full w-1/2 content-center">
                        <SignUpButton/>
                    </div>
                    <div className="h-full w-1/2 content-center">
                        <LoginButton/>
                    </div>
                </div>
                }
                { authed && <div className="flex items-center justify-evenly min-w-1/20 h-full bg-amber-800 mr-2">
                </div>
                }
            </div>
        </div>
    )
}
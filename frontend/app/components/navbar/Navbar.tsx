import Logo from "~/components/Logo";
import PageLink from "~/components/navbar/PageLink";

export type LinkData = {
    text: string;
    href: string;
}

export default function Navbar({links}: {links: LinkData[]}) {
    // divided into 3 sections
    // logo section for logo
    // link section for website pages and links
    // icon section for the user account icon
    return (
        <div className="flex w-full h-[10dvh] min-h-20 justify-center items-center border-solid border-b bg-transparent z-20">
            <div className="flex items-center min-w-9/10 h-8/10">
                <div className="flex justify-center min-w-1/4 h-full bg-red-50">
                    <Logo/>
                </div>
                <div className="flex items-center min-w-1/2 w-8/10 h-full" >
                    {links.map((link) => (
                        <PageLink key={link.href} text={link.text} href={link.href}></PageLink>
                    ))}
                </div>
                <div className="flex items-center justify-center min-w-1/20 h-full bg-amber-800">

                </div>
            </div>
        </div>
    )
}
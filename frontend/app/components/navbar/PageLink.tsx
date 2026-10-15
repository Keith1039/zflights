import type {LinkData} from "~/components/navbar/Navbar";

export default function PageLink(data: LinkData) {
    return (
        <a href={data.href} className="h-full items-center content-center text-lg font-bold m-6">
            {data.text}
        </a>
    )
}
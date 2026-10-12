import type {LinkData} from "~/components/navbar/Navbar";

export default function PageLink(data: LinkData) {
    return (
        <a href={data.href} className="flex w-full h-full justify-center items-center hover:bg-(--page-link-hover-color) text-sm font-bold">
            {data.text}
        </a>
    )
}
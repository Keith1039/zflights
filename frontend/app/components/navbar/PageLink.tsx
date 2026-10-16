import type {LinkData} from "~/components/navbar/Navbar";

export default function PageLink(data: LinkData) {
    return (
        <div className="h-full content-center transition duration-150 ease-in hover:border">
            <a href={data.href} className="text-lg font-bold m-6">
                {data.text}
            </a>
        </div>
    )
}
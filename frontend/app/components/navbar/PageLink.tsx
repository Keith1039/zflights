import type {LinkData} from "~/components/navbar/Navbar";

export default function PageLink(data: LinkData) {
    return (
        <a href={data.href} className="flex h-full justify-center items-center transition duration-150 ease-in hover:border">
            <p className="text-lg font-bold m-6">
                {data.text}
            </p>
        </a>
    )
}
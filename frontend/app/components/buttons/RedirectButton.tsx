
export default function RedirectButton({caption, href}: {href: string, caption: string}) {
    return (
        <a href={href}>
            <button className="w-full pt-1.5 pb-1.5 bg-blue-400 rounded-md text-nowrap">
                {caption}
            </button>
        </a>
    )
}
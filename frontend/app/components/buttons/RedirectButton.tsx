
export default function RedirectButton({caption, href}: {href: string, caption: string}) {
    return (
        <a href={href}>
            <button
                className="w-full pt-1.5 pb-1.5 cursor-pointer rounded-md text-nowrap bg-blue-500 hover:bg-blue-700">
                {caption}
            </button>
        </a>
    )
}
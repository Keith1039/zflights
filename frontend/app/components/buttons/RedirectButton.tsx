
export default function RedirectButton({caption, href}: {href: string, caption: string}) {
    return (
        <a href={href}>
            <button
                onClick={(e) => {e.preventDefault()}}
                className="w-full pt-1.5 pb-1.5 cursor-pointer bg-blue-400 rounded-md text-nowrap hover:bg-blue-500">
                {caption}
            </button>
        </a>
    )
}
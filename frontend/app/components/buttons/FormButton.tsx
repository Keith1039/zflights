
export default function FormButton({caption}: {caption: string}) {
    return (
        <button type="submit" className="cursor-pointer text-lg font-bold pb-2 pt-2 pl-8 pr-8 border-solid border bg-blue-400 rounded-md">
            {caption}
        </button>
    )
}
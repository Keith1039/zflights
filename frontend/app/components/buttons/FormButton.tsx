
export default function FormButton({caption}: {caption: string}) {
    return (
        <button type="submit" className="cursor-pointer text-lg font-bold pb-2 pt-2 pl-8 pr-8 border-solid border rounded-md bg-blue-500 hover:bg-blue-700">
            {caption}
        </button>
    )
}
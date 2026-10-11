import Logo from "~/components/Logo";

export default function Navbar() {
    // divided into 3 sections
    // logo section for logo
    // link section for website pages and links
    // icon section for the user account icon
    return (
        <div className="flex items-center w-full h-[10dvh] min-h-20 bg-red-600">
            <div className="flex justify-center min-w-1/4 h-full bg-black">
                <Logo/>
            </div>
            <div className="flex items-center justify-around min-w-1/2 w-8/10 bg-yellow-400">
                <p>elem 1</p>
                <p>elem 2</p>
                <p>elem 3</p>
            </div>
            <div className="flex items-center justify-center min-w-1/20 h-full bg-amber-800">

            </div>
        </div>
    )
}
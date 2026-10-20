import Logo from "~/components/Logo";
import {Outlet} from "react-router";

export default function (){
    return (
        <div className="flex min-w-dvh min-h-dvh justify-center items-center bg-transparent">
            <div className="flex flex-col w-3/4 z-20 gap-15">
                <div className="flex w-full justify-center items-center z-20">
                    <a href="/" className="flex w-1/10 justify-center items-center rounded-md transition duration-150 ease-in hover:border">
                        <Logo/>
                    </a>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}
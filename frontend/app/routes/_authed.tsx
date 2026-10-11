import Navbar from "~/components/Navbar";
import {Outlet} from "react-router";

export default function (){
    return (
        <div className="flex min-w-dvh min-h-dvh bg-gray-700">
            <Navbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}
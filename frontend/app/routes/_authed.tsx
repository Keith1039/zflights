import Navbar from "~/components/navbar/Navbar";
import {Outlet} from "react-router";
import HomeNavbar from "~/components/navbar/HomeNavbar";

export default function (){
    return (
        <div className="flex flex-col min-w-dvh min-h-dvh bg-gray-700">
           <HomeNavbar/>
            <div className="w-full flex-1 bg-blue-400">
                <Outlet/>
            </div>
        </div>
    )
}
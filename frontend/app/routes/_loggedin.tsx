import {Outlet} from "react-router";
import AuthedNavbar from "~/components/navbar/AuthedNavbar";

export default function (){
    return (
        <div className="flex flex-col min-w-dvh min-h-dvh bg-transparent">
            <AuthedNavbar/>
            <Outlet/>
        </div>
    )
}
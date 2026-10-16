import HomeNavbar from "~/components/navbar/HomeNavbar";
import {Outlet} from "react-router";

export default function () {
    return (
        <div className="flex flex-col min-w-dvh min-h-dvh bg-transparent">
            <HomeNavbar/>
            <Outlet/>
        </div>
    )
}
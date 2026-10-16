import {ChevronDown, ChevronUp} from "lucide-react";
import React from "react";

export default function DropdownChildWrapper({ isOpen, children }: { isOpen: boolean, children: React.ReactNode}) {
    return (
        <div className="flex flex-row w-full h-full z-20">
            {children}
            {!isOpen && <ChevronDown/>}
            {isOpen && <ChevronUp/>}
        </div>
    )
}
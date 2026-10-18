import React from "react";
import type {DropdownLinkProps} from "~/components/dropdown/DropdownContainer";

export default function DropdownSection({links}: {links: DropdownLinkProps[]}) {
    return (
        <div className="flex flex-col absolute top-8/10 -left-1/5 min-w-full max-w-15/10 border-solid border max-h-40 overflow-y-auto z-30">
            <ul className="">
                {links.map((link) => (
                    <li className="bg-black border-solid border-b pt-2 pb-2 text-lg font-bold text-center cursor-pointer transition duration-150 ease-in hover:bg-(--navbar-hover-color)"
                        key={link.caption}
                        onClick={(e) => {
                            e.preventDefault();
                            // run the action
                            link.action()
                        }}> {link.caption}</li>
                ))}
            </ul>
        </div>
    )
}
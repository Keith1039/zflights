import React from "react";
import type {DropdownLinkProps} from "~/components/dropdown/DropdownContainer";

export default function DropdownSection({links}: {links: DropdownLinkProps[]}) {
    return (
        <div className="flex flex-col absolute top-8/10 -left-1/5 w-full border-solid border h-40 overflow-y-auto z-30">
            <ul className="">
                {links.map((link) => (
                    <li className="bg-black border-solid border-b pt-1 pb-1 text-center"
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
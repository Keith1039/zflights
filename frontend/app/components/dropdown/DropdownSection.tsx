import React from "react";
import type {DropdownLinkProps} from "~/components/dropdown/DropdownContainer";

export default function DropdownSection({links}: {links: DropdownLinkProps[]}) {
    return (
        <ul className="z-30">
            {links.map((link) => (
                <li className=""
                    key={link.caption}
                    onClick={(e) => {
                    e.preventDefault();
                    // run the action
                    link.action()
                }}> {link.caption}</li>
            ))}
        </ul>
    )
}
import React from "react";
import DropdownSection from "~/components/dropdown/DropdownSection";
import DropdownChildWrapper from "~/components/dropdown/DropdownChildWrapper";

export type DropdownLinkProps = {
    caption: string;
    action: () => void;
}

export default function DropdownContainer({ links, children }: { links: DropdownLinkProps[], children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <div className="flex flex-col relative w-full h-full bg-transparent transition duration-150 ease-in hover:border"
             onMouseLeave={() => setIsOpen(false)}
            onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
        }}>
            <DropdownChildWrapper isOpen={isOpen}>
                {children}
            </DropdownChildWrapper>
            {isOpen && <DropdownSection links={links}/>
            }
        </div>
    )
}
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Links } from "./header";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

interface PopOverMobile extends React.HTMLAttributes<HTMLDivElement> {
    links?: Links[]
}

export default function PopOverMobile({ className,links }:PopOverMobile){
    return (
        <DropdownMenu> 
            <DropdownMenuTrigger className={className}>
                <MenuIcon className="size-8"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                        {
                            links?.map((item) => (
                                <DropdownMenuItem className="p-2">
                                    <Link key={item.href} href={item.href}>
                                        <div className="w-full flex items-center justify-end">
                                            {item.title}
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
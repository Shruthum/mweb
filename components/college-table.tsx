"use client"

import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getData } from "@/actions/college-data/fetch-data";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useSearchParams } from "next/navigation";


interface CollegeCodeHoverCardProps {
    code:string,
    headmaster: string,
    phoneno: string,
    email: string,
    children?: React.ReactNode
}

export interface CollegesProps extends CollegeCodeHoverCardProps{
    id: number
    name: string;
    highersecondary: string;
    loweersecondary: string;
    district: string;
    block: string;
    ps: string;
} 

const CollegeCodeHoverCard = ({ code,email,headmaster,phoneno,children }:CollegeCodeHoverCardProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex flex-col justify-between gap-x-2">
                    <div>{code}</div>
                    <div>{email}</div>
                    <div>{headmaster}</div>
                    <div>{phoneno}</div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
const rowheader = ["Code","Name","Higher","Lower","District","Block","Police Station"]

export default function CollegeTable(){

    const searchparams = useSearchParams()
    const paramdata = searchparams.get("search")
    const { data,error } = useQuery({
        queryKey: ["colleges"],
        queryFn: getData,
    })
    
    if(!data)(
        <div className="text-xl font-semibold">There are no data present in the database</div>
    )
    return (
            <Table>
                <TableCaption>List of Colleges</TableCaption>
                <TableHeader>
                    <TableRow>
                        {rowheader.map((item,index) => (
                            <TableHead key={index}>
                                {item}
                            </TableHead>
                        ))}
                    </TableRow>    
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {data?.map(({ headmaster,email,code,name,highersecondary,loweersecondary,district,block,ps,phoneno },index) => (
                            <>
                                <CollegeCodeHoverCard code={code} email={email} headmaster={headmaster} phoneno={phoneno}>
                                    <TableCell>{code}</TableCell>
                                </CollegeCodeHoverCard>
                                <TableCell>{name}</TableCell>
                                <TableCell>{highersecondary}</TableCell>
                                <TableCell>{loweersecondary}</TableCell>
                                <TableCell>{district}</TableCell>
                                <TableCell>{block}</TableCell>
                                <TableCell>{ps}</TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
    )
}

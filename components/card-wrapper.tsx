"use client"

import BackButton from "./back-button"
import Header from "./header-component"
import Social from "./social-comp"
import { Card,CardContent,CardTitle,CardFooter, CardHeader } from "./ui/card"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?:boolean
    message?: string
}
export default function CardWrapper({backButtonHref,message,backButtonLabel,children,headerLabel,showSocial}:CardWrapperProps) {
    return(
        <Card className="w-[24rem] md:w-[48rem] shadow-md md:shadow-xl">
            <CardHeader>
                <Header label={headerLabel} message={message}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref}/>
            </CardFooter>
        </Card>
    )
}
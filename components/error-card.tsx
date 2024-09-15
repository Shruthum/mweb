import Header from "./header-component"
import BackButton from "./back-button"
import CardWrapper from "./card-wrapper"
import { FaExclamationTriangle } from "react-icons/fa"

export default function ErrorCard(){
    return (
        <CardWrapper
         headerLabel="Oops! Something went wrong!"
         backButtonHref="/auth/login"
         backButtonLabel="Back to Login"
        >
            <div className="w-full items-center justify-center flex">
                <FaExclamationTriangle className="size-5 text-destructive"/>
            </div>
        </CardWrapper>
    )
}
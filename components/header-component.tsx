interface HeaderComponentProps {
    label: string
    message?: string
}
export default function Header({label,message}:HeaderComponentProps){
    return(
        <div className="w-full flex flex-col gap-y-2 items-center justify-center">
            <h1 className="text-4xl bg-gradient-to-r font-semibold text-transparent bg-clip-text from-pink-400 via-blue-400 to-purple-400"> 
                {label}
            </h1>
            <p className="text-neutral-900 text-base md:text-xl">{message}</p>
        </div>
    )
}
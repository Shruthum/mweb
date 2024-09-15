import QueryProvider from "./_provider/query-provider";

export default function WorkLayout({ children }:{ children: React.ReactNode }){
    return (
        <div className="">
            <QueryProvider>
                {children}
            </QueryProvider>
        </div>
    )
}
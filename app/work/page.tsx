
export const runtime = "edge"
import CollegeForm from "@/components/college-form"
import { Separator } from "@/components/ui/separator"
import SignOut from "@/components/sign-out-button"
import { getData } from "@/actions/college-data/fetch-data"
import { DataTableDemo } from "@/components/data-table"

export default async function WorkingPage(){

    const data = await getData()
    if(!data){
        return
    }
    return (
        <> 
            <div className="space-y-4">
                <SignOut />
                <Separator />
                <div className="space-y-4">
                        <div className="font-semibold text-xl md:text-3xl">
                            Add College 
                        </div>
                        <CollegeForm />
                </div>
                <Separator />
                <DataTableDemo data={data}/>
            </div>
        </>
    )
}
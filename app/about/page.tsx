
export const runtime = "edge"
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion"

export default function AboutPage(){

    return (
        <div className="h-full flex items-center justify-center text-center flex-col">
            <h1 className="py-5 text-3xl md:text-5xl font-semibold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">Management Web</h1>
            <section>
                <span className="md:text-xl text-muted-foreground">
                    An integrated Web Application that uses Centralized College information.<br/>
                    It can be used to Store,orgranize data including Colleges,Headmasters,Addresses
                </span>
            </section>
            <div aria-label="regarding-software" className="p-10 ">
                <AccordionMWeb />
            </div>
            <div className="text-xl flex gap-x-2" aria-label="contact-data">
                <div className="font-bold">Contact:</div>
                <div className="flex flex-col gap-y-1">
                    <h4>Shruthum Dutta</h4>
                    <section className="text-base">management.college.web@gmail.com</section>
                </div>
            </div>
        </div>  
    )
}
const accordionItems = [
    {
        'q': 'Is it accessible?',
        'ans': 'No, The User has to SignIn inorder to work on the system.'
    },
    {
        'q': 'How MWeb works?',
        'ans': 'Single Database is provided for working on colleges,administration and important data regaring college anyone logging in can work on the same database'
    },
    {
        'q': 'Is it styled',
        'ans': 'Yes,It comes with latest tailwindcss styled and with shadcn ui components'
    },
    {
        'q': 'Is it animated?',
        'ans': 'No, It doesnot comes with animation because software comes first'
    }
]
function AccordionMWeb(){
    return (
        <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item,index) => (
                <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-md gap-x-60 md:gap-x-[30rem]">{item.q}</AccordionTrigger>
                    <AccordionContent>
                        {item.ans}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
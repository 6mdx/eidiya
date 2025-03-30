import { getLinks } from "@/serverFn/links"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { LinkCard } from "./link-card"
import { CreateLinkDailog } from "./create-link-dailog"


export function LinksList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['links'],
        queryFn: () => getLinks(),
        staleTime: 1000 * 60
    })
    if (isLoading || isError) {
        return (
            <div className="size-full flex items-center justify-center">
                {isError ?
                    'حدث خطأ'
                    :
                    <Loader2 className="size-8 animate-spin text-muted-foreground" />
                }
            </div>
        )
    }
    if (!data || data.length <= 0) {
        return (
            <div className="size-full flex flex-col gap-4 items-center justify-center">
                <span className="text-xl font-semibold">شكلك باقي ماسويت لك رابط 🤔</span>
                <CreateLinkDailog />
            </div>
        )
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
            {data.map((link) => (
                <LinkCard key={link.id} {...link} />
            ))}
        </div>
    )
}
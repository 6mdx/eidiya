import { getLinks } from "@/serverFn/links"
import { useQuery } from "@tanstack/react-query"
import { Loader2, TriangleAlert } from "lucide-react"
import { GiftCard } from "./gift-card"
import { getGifts } from "@/serverFn/gifts"


type Props = {
    linkId: string
}

export function GiftsList({ linkId }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["gifts"],
        queryFn: () => getGifts({ data: { linkId } })
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
    if (!data || data.length <= 0 || data === "not_found") {
        return (
            <div className="size-full flex flex-col gap-4 items-center justify-center">
                {data === "not_found" ?
                    <div className="flex flex-col items-center text-center gap-4">
                        <TriangleAlert className="h-8 w-8 text-destructive" />
                        <span className="text-xl font-semibold">الرابط غير صحيح</span>
                    </div>
                    :
                    <span className="text-xl font-semibold">باقي ماحد ارسل لك عيدية 🦦</span>
                }
            </div>
        )
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
            {data.map((link) => (
                <GiftCard key={link.id} {...link} />
            ))}
        </div>
    )
}
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { User } from "lucide-react"
import { DeleteGiftDailog } from "./delete-gift-dailog"
import { ShareGiftPopover } from "./share-popover"



type Props = {
    id: string
    name?: string | null
    text?: string | null
    anonymous: boolean
    createdAt: Date
}



export function GiftCard({ id, name, text, anonymous, createdAt }: Props) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md gap-2 flex flex-col">
            <CardHeader className="bg-muted/50 pb-4">
                <CardTitle className="flex items-center gap-2 truncate leading-[1.5]">
                    <User className={"h-4 w-4 " + (anonymous ? 'text-destructive' : 'text-primary')} />
                    {anonymous ? 'مجهول' : name}
                </CardTitle>
                <CardDescription className="text-xs">
                    وقت الانشاء  {new Intl.DateTimeFormat('ar-SA', { timeStyle: 'short', dateStyle: 'medium' }).format(createdAt)}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1">
                <h4 className="mb-1 text-sm font-medium ">العيدية 🎁:</h4>
                <p className="line-clamp-2 text-sm text-muted-foreground whitespace-pre-line">{text}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/30 px-6 py-3">
                <ShareGiftPopover name={name || 'مجهول'} message={text} />
                <div className="flex items-center gap-2">
                    <DeleteGiftDailog id={id} name={name || 'مجهول'} />
                </div>
            </CardFooter>
        </Card>
    )
}
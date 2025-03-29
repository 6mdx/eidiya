import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Gift, Link2 } from "lucide-react"
import { Button } from "../ui/button"
import { DeleteLinkDailog } from "./delete-link-dailog"
import { EditLinkDailog } from "./edit-link-dailog"
import { SharePopover } from "./share-popover"


type Props = {
    id: string
    title: string
    welcomeMessage?: string | null
    giftCount: number
    maxGifts: number
    createdAt: Date
    active: boolean
}



export function LinkCard({ id, title, welcomeMessage, giftCount, maxGifts, active, createdAt }: Props) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md gap-2 flex flex-col">
            <CardHeader className="bg-muted/50 pb-4">
                <CardTitle className={"flex items-center gap-2 truncate " + (!active && 'line-through')}>
                    <Link2 className={"h-4 w-4 " + (active ? 'text-primary' : 'text-destructive')} />
                    {title}
                </CardTitle>
                <CardDescription className="text-xs">
                    وقت الانشاء  {new Intl.DateTimeFormat('ar-SA', { timeStyle: 'short', dateStyle: 'medium' }).format(createdAt)}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1">
                <h4 className={"mb-1 text-sm font-medium " + (!welcomeMessage && 'line-through')}>رسالة الترحيب 👋</h4>
                <p className="line-clamp-2 text-sm text-muted-foreground">{welcomeMessage}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/30 px-6 py-3">
                <div className="flex items-center gap-2">
                    <Button dir="ltr" variant="outline" className="items-center" title="View gifts">
                    <span className="mt-1">{giftCount} /{maxGifts}</span>
                        <Gift className="h-4 w-4" />
                    </Button>
                    <SharePopover linkId={id} active={active} />
                </div>
                <div className="flex items-center gap-2">
                    <EditLinkDailog linkData={{ id, title, welcomeMessage, maxGifts, active }}/>
                    <DeleteLinkDailog id={id} title={title} />
                </div>
            </CardFooter>
        </Card>
    )
}
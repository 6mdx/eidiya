import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Gift, Link2, Share, Settings } from "lucide-react"
import { Button } from "../ui/button"
import { DeleteLinkDailog } from "./delete-link-dailog"


type Props = {
    id: string
    title: string
    welcomeMessage: string | null
    giftCount: number
    createdAt: Date
}



export function LinkCard({ id, title, welcomeMessage, giftCount, createdAt }: Props) {

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md gap-2">
            <CardHeader className="bg-muted/50 pb-4">
                <CardTitle className="flex items-center gap-2 truncate">
                    <Link2 className="h-4 w-4 text-primary" />
                    {title}
                </CardTitle>
                <CardDescription className="text-xs">
                    وقت الانشاء  {new Intl.DateTimeFormat('ar-SA', { timeStyle: 'short', dateStyle: 'medium' }).format(createdAt)}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <h4 className="mb-1 text-sm font-medium text-muted-foreground">رسالة الترحيب 👋</h4>
                <p className="line-clamp-2 text-sm">{welcomeMessage}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/30 px-6 py-3">
                <div className="flex items-center gap-2">
                    <Button variant="outline" title="View gifts">
                        <Gift className="h-4 w-4" />
                        {giftCount}
                    </Button>
                    <Button variant="outline" size="icon" title="Share">
                        <Share className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" title="Settings">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <DeleteLinkDailog id={id} title={title} />
                </div>
            </CardFooter>
        </Card>
    )
}
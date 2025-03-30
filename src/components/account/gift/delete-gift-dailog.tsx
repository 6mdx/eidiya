import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { deleteGiftFn } from "@/serverFn/gifts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMatch } from "@tanstack/react-router"
import { Loader2, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    id: string
    name: string
}

export function DeleteGiftDailog({ id, name }: Props) {
    const [open, setOpen] = useState(false)
    const match = useMatch({ from:"/_authed/gifts/$linkId"})
    const params = match.params
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteGiftFn({ data: { id, linkId: params.linkId } }),
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['gifts'] })
            toast.success('تم حذف العيدية بنجاح')
        },
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-destructive/60 hover:text-destructive" size="icon" name="Delete">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent dir="rtl">
                <AlertDialogHeader>
                    <AlertDialogTitle>هل أنت متاكد؟؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        راح تنحذف عيدية "{name}" ، وماراح تقدر ترجعها.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            mutate()
                        }}
                        disabled={isPending}
                    >
                        {isPending ?
                            <>
                                جاري الحذف
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </>
                            :
                            <>
                                حذف
                                <Trash2 className="mr-2 h-4 w-4" />
                            </>
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

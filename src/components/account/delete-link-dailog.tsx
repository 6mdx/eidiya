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
import { deleteLinkFn } from "@/serverFn/links"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    id: string
    title: string
}

export function DeleteLinkDailog({ id, title }: Props) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteLinkFn({ data: { id } }),
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['links'] })
            toast.success('تم حذف الرابط بنجاح')
        },
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-destructive/60 hover:text-destructive" size="icon" title="Delete">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent dir="rtl">
                <AlertDialogHeader>
                    <AlertDialogTitle>هل أنت متاكد؟؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        راح ينحذف الرابط "{title}" ، وماراح تقدر ترجعه.
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

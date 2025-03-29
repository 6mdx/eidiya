import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createLink, editLink } from "@/serverFn/links"
import { useForm } from '@tanstack/react-form'
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { LinkFormSchema, linkFormSchema } from "@/lib/validator-schemas"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


type Props = React.ComponentProps<"form"> & {
    closeModal: () => void
    defaultValues?: LinkFormSchema
} & (
        | { mode: "edit"; id: string } // Required for "edit" mode
        | { mode: "create"; id?: string } // Optional for "create" mode
    )
export function LinkForm({ className, id, closeModal, mode, defaultValues }: Props) {
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: async (values: LinkFormSchema) => {
            if (mode === "edit") {
                return await editLink({ data: { id, updatedData: values } })
            } 
            return await createLink({ data: values })
        },
        onSuccess: (data) => {
            closeModal()
            queryClient.invalidateQueries({ queryKey: ['links'] })
            if(mode === "edit") {
                toast.success(`تم تعديل الرابط "${data}" بنجاح`)
                return
            }
            toast.success('تم انشاء الرابط بنجاح', {
                action: {
                    label: "نسخ",
                    onClick: () => navigator.clipboard.writeText(`${window.location.origin}/${data}`)
                }
            })
        },
    })

    const form = useForm({
        defaultValues: mode === "edit" ? defaultValues : {
            title: "",
            // welcomeMessage: "",
            maxGifts: 10,
            active: true
        } as LinkFormSchema,
        onSubmit: async ({ value }) => {
            await mutateAsync(value)
        },
        validators: {
            onChange: linkFormSchema,
        },
    })


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}

            className={cn("grid items-start gap-4", className)}
        >
            <div className="grid gap-2">
                <Label htmlFor="title">العنوان</Label>
                <form.Field
                    name="title"
                    children={(field) => (
                        <>
                            <Input
                                id="title"
                                placeholder="عيديات الشلة 🤡"
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errorMap.onChange && field.state.meta.isTouched ? (
                                <em className="text-red-500/60 text-sm">{field.state.meta.errorMap.onChange.map(({ message }) => message).join(', ')}</em>
                            ) : null}
                        </>

                    )}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="welcomeMessage">الترحيب</Label>
                <form.Field
                    name="welcomeMessage"
                    children={(field) => (
                        <>
                            <Textarea
                                id="welcomeMessage"
                                placeholder="يازين اللي يبغى يعيد علي 😍"
                                name={field.name}
                                value={field.state.value || undefined}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value.length <= 0 ? null : e.target.value)}
                            />
                            {field.state.meta.errorMap.onChange && field.state.meta.isTouched ? (
                                <em className="text-red-500/60 text-sm">{field.state.meta.errorMap.onChange.map(({ message }) => message).join(', ')}</em>
                            ) : null}
                        </>
                    )}
                />
            </div>
            <div className="grid gap-2">
                <form.Field
                    name="maxGifts"
                    children={(field) => (
                        <>
                            <Label htmlFor="maxGifts">🎁 {field.state.value} : عدد العيديات</Label>
                            <Slider
                                id="maxGifts"
                                name={field.name}
                                value={[field.state.value]}
                                max={100}
                                min={5}
                                step={5}
                                onBlur={field.handleBlur}
                                onValueChange={([value]) => field.handleChange(value)}
                            />
                            {field.state.meta.errorMap.onChange && field.state.meta.isTouched ? (
                                <em className="text-red-500/60 text-sm">{field.state.meta.errorMap.onChange.map(({ message }) => message).join(', ')}</em>
                            ) : null}
                        </>
                    )}
                />
            </div>
            <div className="flex items-center gap-2">
                <Label htmlFor="active">إستقبال العيديات</Label>
                <form.Field
                    name="active"
                    children={(field) => (
                        <>
                            <Switch
                                dir="ltr"
                                id="active"
                                name={field.name}
                                checked={field.state.value}
                                onBlur={field.handleBlur}
                                onCheckedChange={(value) => field.handleChange(value)}
                            />
                            {field.state.meta.errorMap.onChange && field.state.meta.isTouched ? (
                                <em className="text-red-500/60 text-sm">{field.state.meta.errorMap.onChange.map(({ message }) => message).join(', ')}</em>
                            ) : null}
                        </>
                    )}
                />
            </div>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}
                children={([canSubmit, isSubmitting, isDirty]) => (
                    <Button disabled={!canSubmit || isSubmitting || !isDirty} type="submit">
                        {isSubmitting ?
                            <>
                                {mode === "edit" ? "جاري التعديل" : "جاري الإنشاء"}
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </>
                            :
                            mode === "edit" ? "تعديل" : "إنشاء"
                        }
                    </Button>
                )}
            />

        </form>
    )
}

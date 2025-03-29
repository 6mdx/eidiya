import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SendFormSchema, sendFormSchema } from '@/lib/validator-schemas'
import { useForm } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useMutation } from '@tanstack/react-query'
import { saveGift } from '@/serverFn/gifts'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

type Props = {
    name: string
    linkId: string
}

export function SendForm({ name, linkId }: Props) { 
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
        mutationFn: (values: SendFormSchema) => saveGift({ data: {linkId, gift: values} }),
        onSuccess: () => {
            toast.success('تم إرسال العيدية بنجاح 😍')
            navigate({
                to: "/success"
            })
        },
        onError: (error: Error)=>{
            switch (error.message) {
                case "Link_not_found":
                    toast.error('تأكد من الرابط شكلة خطأ')
                    break;
                case "Link_is_full":
                    toast.error('الشخص اكتفى من العيديات')
                    break;
                case "gift_exists":
                    toast.error('يمديك ترسل عيدية واحده فقط لهذا الشخص')
                    break;
                default:
                    toast.error('حدث خطأ ما')
            }
        }
})

const form = useForm({
    defaultValues: {
        name,
        anonymous: false,
        message: "",
    } as SendFormSchema,
    onSubmit: async ({ value, formApi }) => {
        if (value.anonymous) {
            formApi.setFieldValue("name", null)
        }
        await mutateAsync(value)
    },
    validators: {
        onChange: sendFormSchema,
    },
})
return (
    <Card className='w-full max-w-lg hover:shadow-md transition'>
        <CardHeader>
            <CardTitle>أرسل عيديتك  🎁</CardTitle>
            <CardDescription>
                أرسل عيدية مجهولة ماراح يعرف الشخص مين أنت. 🤫
            </CardDescription>
        </CardHeader>
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}>
            <CardContent className="flex flex-col gap-4">

                <form.Subscribe
                    selector={(state) => state.values.anonymous}
                    children={(anonymous) => {
                        return (
                            <div className={"grid gap-2" + (anonymous ? " hidden" : "")}>
                                <Label htmlFor="name">الإسم:</Label>
                                <form.Field
                                    name="name"
                                    children={(field) => (
                                        <>
                                            <Input
                                                id="name"
                                                placeholder="عبدالرحمن"
                                                name={field.name}
                                                value={field.state.value || ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value.length <= 0 ? undefined : e.target.value)}
                                            />
                                            {field.state.meta.errorMap.onChange ? (
                                                <em className="text-red-500/60 text-sm">{field.state.meta.errorMap.onChange.map(({ message }) => message).join(', ')}</em>
                                            ) : null}
                                        </>

                                    )}
                                />
                            </div>
                        )
                    }}
                />
                <div className='grid gap-2'>
                    <Label htmlFor="message">العيدية:</Label>
                    <form.Field
                        name="message"
                        children={(field) => (
                            <>
                                <Textarea
                                    id="message"
                                    placeholder="كل عام وأنت بخير 🥰"
                                    name={field.name}
                                    value={field.state.value || undefined}
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
                <div className='flex gap-2'>
                    <Label htmlFor="anonymous">إرسال كمجهول ؟ 👻</Label>
                    <form.Field
                        name="anonymous"
                        children={(field) => (
                            <>
                                <Switch
                                    dir="ltr"
                                    id="anonymous"
                                    name={field.name}
                                    checked={field.state.value}
                                    onBlur={field.handleBlur}
                                    onCheckedChange={(value) => {
                                        if (value) form.setFieldValue("name", null)
                                        field.handleChange(value)
                                    }}
                                />
                                {field.state.meta.errorMap.onChange && field.state.meta.isTouched ? (
                                    <em className="text-red-500/60 text-sm">{field.state.meta.errorMap.onChange.map(({ message }) => message).join(', ')}</em>
                                ) : null}
                            </>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button disabled={!canSubmit || isSubmitting} type="submit">
                            {isSubmitting ?
                                <>
                                    <span>جارى الارسال</span>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </>
                                :
                                "ارسل"
                            }
                        </Button>
                    )}
                />

            </CardFooter>
        </form>
    </Card>
)
}
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createLink } from "@/serverFn/links"
import { useForm } from '@tanstack/react-form'
import { object, string, pipe, minLength, maxLength, InferInput } from 'valibot';
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function CreateLinkDailog() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>إنشاء رابط</Button>
        </DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader className="text-right sm:text-right">
            <DialogTitle>إنشاء رابط</DialogTitle>
            <DialogDescription>
              سويلك رابط عشان تقدر تستقبل العيديات 🎁
            </DialogDescription>
          </DialogHeader>
          <ProfileForm closeModal={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>إنشاء رابط</Button>
      </DrawerTrigger>
      <DrawerContent dir="rtl">
        <DrawerHeader>
          <DrawerTitle>إنشاء رابط</DrawerTitle>
          <DrawerDescription>
            سويلك رابط عشان تقدر تستقبل العيديات 🎁
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm closeModal={() => setOpen(false)} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">إغلاق</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const formSchema = object({
  title: pipe(
    string(),
    minLength(3, "العنوان لازم يكون اكثر من 3 حروف"),
    maxLength(50, "العنوان لازم يكون اقل من 50 حروف")
  ),
  welcomeMessage: pipe(
    string(),
    minLength(3, "رسالة الترحيب لازم تكون اكثر من 3 حروف"),
    maxLength(200, "رسالة الترحيب لازم تكون اقل من 200 حروف")
  ),
})

type FormSchema = InferInput<typeof formSchema>

function ProfileForm({ className, closeModal }: React.ComponentProps<"form"> & { closeModal: () => void }) {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: async (data: FormSchema) => await createLink({ data }),
    onSuccess: (data) => {
      closeModal()
      queryClient.invalidateQueries({ queryKey: ['links'] })
      toast.success('تم انشاء الرابط بنجاح', {
        action: {
          label: "نسخ",
          onClick: () => navigator.clipboard.writeText(data)
        }
      })
    },
  })

  const form = useForm({
    defaultValues: {
      title: "",
      welcomeMessage: "",
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    },
    validators: {
      onChange: formSchema
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
              {field.state.meta.errorMap.onChange ? (
                <em className="text-red-600 text-sm">{field.state.meta.errorMap.onChange.map(({ message }) => message).join(', ')}</em>
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
              <Input
                id="welcomeMessage"
                placeholder="يازين اللي يبغى يعيد علي 😍"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errorMap.onChange ? (
                <em className="text-red-600 text-sm">{field.state.meta.errorMap.onChange.map(({ message }) => message).join(', ')}</em>
              ) : null}
            </>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit || isSubmitting} type="submit">
            {isSubmitting ?
              <>
                جاري الانشاء
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
              :
              "إنشاء"
            }
          </Button>
        )}
      />

    </form>
  )
}

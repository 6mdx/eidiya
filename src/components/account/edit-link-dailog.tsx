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
import { useState } from "react"
import { LinkForm } from "./create-edit-form"
import { Settings } from "lucide-react"
import { LinkFormSchema } from "@/lib/validator-schemas"


type Props = {
  linkData: LinkFormSchema & {
    id: string
  }
}

export function EditLinkDailog({ linkData }: Props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" title="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader className="text-right sm:text-right">
            <DialogTitle>تعديل الرابط</DialogTitle>
            <DialogDescription>
              عدل بيانات الرابط 📝
            </DialogDescription>
          </DialogHeader>
          <LinkForm id={linkData.id} mode="edit" defaultValues={linkData} closeModal={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent dir="rtl">
        <DrawerHeader>
          <DrawerTitle>تعديل الرابط</DrawerTitle>
          <DrawerDescription>
            عدل بيانات الرابط 📝
          </DrawerDescription>
        </DrawerHeader>
        <LinkForm id={linkData.id} mode="edit" defaultValues={linkData} closeModal={() => setOpen(false)} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">إغلاق</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}



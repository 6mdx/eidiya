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
import { useQuery } from "@tanstack/react-query"
import { getLinks } from "@/serverFn/links"

export function CreateLinkDailog() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { data } = useQuery({
    queryKey: ['links'],
    queryFn: () => getLinks(),
    staleTime: 1000 * 60
  })

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={data && data.length >= 10}>إنشاء رابط</Button>
        </DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader className="text-right sm:text-right">
            <DialogTitle>إنشاء رابط</DialogTitle>
            <DialogDescription>
              سويلك رابط عشان تقدر تستقبل العيديات 🎁
            </DialogDescription>
          </DialogHeader>
          <LinkForm mode="create" closeModal={() => setOpen(false)} />
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
        <LinkForm mode="create" closeModal={() => setOpen(false)} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">إغلاق</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}



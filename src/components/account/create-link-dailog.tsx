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

export function CreateLinkDailog() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">إنشاء رابط</Button>
        </DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader className="text-right sm:text-right">
            <DialogTitle>إنشاء رابط</DialogTitle>
            <DialogDescription>
              سويلك رابط عشان تقدر تستقبل العيديات 🎁
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">إنشاء رابط</Button>
      </DrawerTrigger>
      <DrawerContent dir="rtl">
        <DrawerHeader>
          <DrawerTitle>إنشاء رابط</DrawerTitle>
          <DrawerDescription>
            سويلك رابط عشان تقدر تستقبل العيديات 🎁
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">إغلاق</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">الإسم</Label>
        <Input type="text" id="name" placeholder="عيديات الشلة 🤡" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="welcomeMessage">الترحيب</Label>
        <Input id="welcomeMessage" placeholder="يازين اللي يبغى يعيد علي 😍" />
      </div>
      <Button type="submit">إنشاء</Button>
    </form>
  )
}

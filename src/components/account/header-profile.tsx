import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { authClient } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"

type User = {
    name: string
    email: string
    image?: string | null
}

export function HeaderProfile({ user }: { user: User }) {
    const navigate = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            return await authClient.signOut()
        },
        onSuccess: (data) => {
            if (data.data?.success) {
                toast.success('تم تسجيل الخروج بنجاح')
                navigate({
                    to: '/sign-in'
                })
            } else {
                toast.error('حدث خطأ ما')
                navigate({
                    to: "/"
                })
            }
        },
        onError: () => {
            toast.error('حدث خطأ ما')
            navigate({
                to: "/"
            })
        }
    })
    return (
        <div className='flex items-center gap-2'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative size-8 rounded-full">
                        <Avatar className="size-8">
                            <AvatarImage src={user?.image || undefined} />
                            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel dir="rtl" className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem dir="rtl" disabled={isPending} onClick={() => mutate()}>
                        تسجيل الخروج
                        {isPending && <Loader className='ml-2 animate-spin' />}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <span className='font-bold'>يا مرحــــبا 👋</span>
        </div>
    )
}
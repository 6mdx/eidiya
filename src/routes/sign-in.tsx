import { createFileRoute } from '@tanstack/react-router'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SignInButtons } from '@/components/sign-in-botton'

export const Route = createFileRoute('/sign-in')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card dir="rtl">
                        <CardHeader className="text-center gap-2">
                            <CardTitle className="text-xl">تسجيل الدخول</CardTitle>
                            <CardDescription>
                                سجل دخول عشان تقدر تستقبل العيديات 🎉
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SignInButtons />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

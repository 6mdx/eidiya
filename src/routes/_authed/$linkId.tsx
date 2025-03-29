import { SendForm } from '@/components/link/send-form'
import { SignInButtons } from '@/components/sign-in-botton'
import { getPublicLink } from '@/serverFn/links'
import { createFileRoute, notFound } from '@tanstack/react-router'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute('/_authed/$linkId')({
    component: RouteComponent,
    beforeLoad: ({ context }) => {
        return {
            session: context.session
        }
    },
    loader: async ({ context, params }) => {
        const link = await getPublicLink({ data: { id: params.linkId } })
        if (!link) throw notFound()
        return {
            user: context.session,
            link
        }
    },
})

function RouteComponent() {
    const { link, user } = Route.useLoaderData()
    return (
        <div dir='rtl' className='min-h-svh size-full bg-background lg:grid-cols-2 grid items-center justify-center overflow-hidden'>
            <div className="flex flex-col flex-1 gap-8 items-center justify-center">
                <div className="w-full  max-w-lg">
                    <div className='flex flex-col items-center text-center gap-4'>
                        <h1 className='text-2xl font-bold'>{link.title}</h1>
                        <p className='text-md whitespace-pre-line'>{link.welcomeMessage}</p>
                    </div>
                </div>
                {
                    link.isFull ?
                        <Card className='hover:shadow-md transition'>
                            <CardHeader className='items-center'>
                                <CardTitle>ماعليش سامحنا</CardTitle>
                                <CardDescription>الرابط وصل للعدد المحدد من العيديات 😥</CardDescription>
                            </CardHeader>
                        </Card>
                        :
                        user ?
                            <SendForm linkId={link.id} name={user.name} />
                            :
                            <Card className='w-full max-w-md hover:shadow-md transition'>
                                <CardHeader>
                                    <CardTitle>تسجيل الدخول</CardTitle>
                                    <CardDescription>
                                        ماعليك يمديك تخفي مين أنت إذا جيت ترسل العيدية 😉
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SignInButtons callbackURL={`/${link.id}`} />
                                </CardContent>
                            </Card>

                }
            </div>

            <div className="relative size-full hidden lg:block">
                <img
                    src="/fireworks.jpg"
                    alt="fireworks"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

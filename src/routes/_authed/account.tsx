import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/account')({
  component: RouteComponent,
  loader(ctx) {
    const user = ctx.context.user
    return {
      user
    }
  },
})

function RouteComponent() {
  const { user } = Route.useLoaderData()
  return (
    <div dir='rtl' className="flex flex-col gap-4 p-4">
      <header className='flex items-center justify-between w-full h-14 border-b'>
        <h3 className='text-xl font-bold'>يا مرحــبا {user.name} 👋</h3>
        <div className='flex items-center gap-2'>
          <Button variant="outline" >إنشاء رابط</Button>
          <Button variant="destructive" >تسجيل الخروج</Button>
        </div>
      </header>
      <div className='flex'>

      </div>
    </div>
  )
}

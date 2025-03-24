import { CreateLinkDailog } from '@/components/account/create-link-dailog'
import { HeaderProfile } from '@/components/account/header-profile'
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

  return (
    <div dir='rtl' className="flex flex-col gap-4 p-4 container mx-auto">
      <header className='flex items-center justify-between border-b w-full h-12'>
        <HeaderProfile />
        <CreateLinkDailog />
      </header>
      <div className='flex'>

      </div>
    </div>
  )
}

import { CreateLinkDailog } from '@/components/account/create-link-dailog'
import { HeaderProfile } from '@/components/account/header-profile'
import { LinksList } from '@/components/account/links-list'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/account')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/sign-in"
      })
    } else {
      return { user: context.session }
    }
  },
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
    <div dir='rtl' className="flex h-screen flex-col gap-4 p-4 container mx-auto">
      <header className='flex items-center justify-between border-b w-full h-16 p-2 px-4'>
        <HeaderProfile user={user} />
        <CreateLinkDailog />
      </header>
      <LinksList />
    </div>
  )
}

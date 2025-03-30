import { GiftsList } from '@/components/account/gift/gifts-list'
import { HeaderProfile } from '@/components/account/header-profile'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/gifts/$linkId')({
  component: RouteComponent,
  beforeLoad: ({ context, params }) => {
    if (!context.session) {
      throw redirect({
        to: "/sign-in",
        search: { callbackURL: `/gifts/${params.linkId}` },
      })
    } else {
      return { user: context.session }
    }
  },
  loader(ctx) {
    const user = ctx.context.user
    return {
      user,
      linkId: ctx.params.linkId
    }
  },
})

function RouteComponent() {
  const { user, linkId } = Route.useLoaderData()
  return (
    <div dir='rtl' className="flex h-screen flex-col gap-4 p-4 container mx-auto">
      <header className='flex items-center justify-between border-b w-full h-16 p-2 px-4'>
        <HeaderProfile user={user} />
        <Button asChild>
          <Link to="/account">
            الرجوع للروابط
          </Link>
        </Button>
      </header>
      <GiftsList linkId={linkId} />
    </div>
  )
}

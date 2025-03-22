import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/account')({
  component: RouteComponent,
  loader(ctx) {
    const session = ctx.context.session
    return {
      session
    }
  },
})

function RouteComponent() {
  const {session} = Route.useLoaderData()
  return (
    <div>
      <h1>Account</h1>
      <p>Session: {JSON.stringify(session)}</p>
    </div>
  )
}

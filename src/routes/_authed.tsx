import { auth } from '@/lib/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getHeaders } from '@tanstack/react-start/server'


const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getHeaders()
  const session = await auth.api.getSession({headers: headers})
  console.log(session?.user)
  return session
})

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.fetchQuery({
      queryKey: ['session'],
      queryFn: async () => {
        return await getSession()
      },
      staleTime: 1000 * 60 * 3
    })
    if(!session) {
      throw redirect({
        to: "/sign-in"
      })
    }
    return { session }
  },
})


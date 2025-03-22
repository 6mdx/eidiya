import { auth } from '@/lib/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getHeaders } from '@tanstack/react-start/server'


const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getHeaders() as unknown as Headers
  const session = await auth.api.getSession({headers: headers})
  return session?.user
})

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ['session'],
      queryFn: async () => {
        return await getSession()
      },
      staleTime: 1000 * 60 * 3
    })
    if(!user) {
      throw redirect({
        to: "/sign-in"
      })
    }
    return { user }
  },
})


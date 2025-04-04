import { auth } from '@/lib/auth'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getHeaders } from '@tanstack/react-start/server'


const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getHeaders() as unknown as Headers
  const session = await auth.api.getSession({ headers: headers })
  return session?.user
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
    return { session }
  },
})


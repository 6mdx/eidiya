import { createMiddleware } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { auth } from "./auth";

export const authMiddleware = createMiddleware().server( async ({ next }) => {
    const headers = getHeaders() as unknown as Headers
    const session = await auth.api.getSession({ headers: headers })
    if(!session) throw redirect({ to: "/sign-in"})
    return next({ context: { session }})
})
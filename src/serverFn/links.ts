import { addLink, deleteLink, getLinksByUserId } from "@/data-access/link";
import { Link } from "@/db/schema";
import { authMiddleware } from "@/lib/auth-middleware";
import { createServerFn } from "@tanstack/react-start";
import { z } from 'zod'

const createLinkSchema = z.object({
    title: z.string().max(50, "Title must be less than 150 characters").min(3, "Title must be at least 3 characters"),
    welcomeMessage: z.string().max(200, "Welcome message must be less than 1000 characters").min(3, "Welcome message must be at least 3 characters")
})

export const createLink = createServerFn({method:"POST"}).middleware([authMiddleware]).validator(createLinkSchema).handler(async ({data , context}) => {
    const { session } = context
    const { title, welcomeMessage } = data
    const link = await addLink({
        title,
        welcomeMessage,
        userId: session.user.id,
        maxGifts: 10,
    })
    return link[0].id
})

export const getLinks = createServerFn({method:"GET"}).middleware([authMiddleware]).handler(async ({context}) => {
    const { session } = context
    const links = await getLinksByUserId(session.user.id)
    return links
})

const deleteLinkSchema = z.object({
    id: z.string().cuid2()
})

export const deleteLinkFn = createServerFn({method:"POST"}).middleware([authMiddleware]).validator(deleteLinkSchema).handler(async ({data , context}) => {
    const { id } = data
    return await deleteLink(id)
})
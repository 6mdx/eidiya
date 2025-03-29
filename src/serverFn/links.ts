import { addLink, deleteLink, getLinksByUserId, updateLink } from "@/data-access/link";
import { authMiddleware } from "@/lib/auth-middleware";
import { deleteLinkSchema, linkFormSchema, updateLinkSchema } from "@/lib/validator-schemas";
import { createServerFn } from "@tanstack/react-start";


export const createLink = createServerFn({method:"POST"}).middleware([authMiddleware]).validator(linkFormSchema).handler(async ({data , context}) => {
    const { session } = context
    const { welcomeMessage, ...rest } = data
    const link = await addLink({
        userId: session.user.id,
        welcomeMessage: data.welcomeMessage || null,
        ...rest
    })
    return link[0].id
})

export const editLink = createServerFn({method:"POST"}).middleware([authMiddleware]).validator(updateLinkSchema).handler(async ({data}) => {
    const { id, updatedData } = data
    const link = await updateLink(id, updatedData)
    return link[0].title
})

export const getLinks = createServerFn({method:"GET"}).middleware([authMiddleware]).handler(async ({context}) => {
    const { session } = context
    const links = await getLinksByUserId(session.user.id)
    return links
})


export const deleteLinkFn = createServerFn({method:"POST"}).middleware([authMiddleware]).validator(deleteLinkSchema).handler(async ({data , context}) => {
    const { id } = data
    return await deleteLink(id)
})
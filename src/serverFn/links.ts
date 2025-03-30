import { addLink, deleteLink, getLinkById, getLinksByUserId, getLinksCount, updateLink } from "@/data-access/link";
import { authMiddleware } from "@/lib/auth-middleware";
import { linkIdSchema, linkFormSchema, updateLinkSchema } from "@/lib/validator-schemas";
import { createServerFn } from "@tanstack/react-start";


export const createLink = createServerFn({method:"POST"}).middleware([authMiddleware]).validator(linkFormSchema).handler(async ({data , context}) => {
    const { session } = context
    const { welcomeMessage, ...rest } = data
    const linksCount = await getLinksCount(session.user.id)
    if(linksCount[0].count >= 10) throw new Error("max_links_reached")
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


export const deleteLinkFn = createServerFn({method:"POST"}).middleware([authMiddleware]).validator(linkIdSchema).handler(async ({data , context}) => {
    const { id } = data
    return await deleteLink(id)
})

export const getPublicLink = createServerFn({method:"GET"}).validator(linkIdSchema).handler(async ({ data }) => {
    const link = await getLinkById(data.id)
    if(!link) return null
    const { giftCount, maxGifts, ...rest } = link
    return {...rest, isFull: giftCount >= maxGifts}
})
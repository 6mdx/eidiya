import { addGift, deleteGift, getGiftBySenderIdAndLinkId, getGiftsByLinkId } from "@/data-access/gift";
import { getLinkById, getLinkByIdAndUserId, updateLink } from "@/data-access/link";
import { authMiddleware } from "@/lib/auth-middleware";
import { getGiftsSchema, giftAddSchema, giftDeleteSchema } from "@/lib/validator-schemas";
import { createServerFn } from "@tanstack/react-start";



export const getGifts = createServerFn({ method: "POST" }).validator(getGiftsSchema).middleware([authMiddleware]).handler(async ({ context, data }) => {
    const { session } = context
    const link = await getLinkByIdAndUserId(data.linkId, session.user.id)
    if (!link) return "not_found"
    
    return await getGiftsByLinkId(data.linkId)
})

export const deleteGiftFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(giftDeleteSchema).handler(async ({ context, data }) => {
    const { session } = context
    const link = await getLinkByIdAndUserId(data.linkId, session.user.id)
    if (!link) throw new Error("Link_not_found")
    const updatedLink = await updateLink(link.id, { giftCount: link.giftCount - 1 })
    if(updatedLink.length === 0) {
        console.error("failed to update link", link.id)
        throw new Error("server_error")
    }
    return deleteGift(data.id, link.id)
    
})

export const saveGift = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(giftAddSchema).handler(async ({ context, data }) => {
    const { session } = context
    const { linkId, gift } = data

    const link = await getLinkById(linkId)
    if (!link) throw new Error("Link_not_found")
    if (link.maxGifts <= link.giftCount) throw new Error("Link_is_full")

    const oldGift = await getGiftBySenderIdAndLinkId(session.user.id, linkId)
    if (oldGift) throw new Error("gift_exists")

    const updatedLink = await updateLink(link.id, { giftCount: link.giftCount + 1 })
    if(updatedLink.length === 0) {
        console.error("failed to update link", link.id)
        throw new Error("server_error")
    }
    return await addGift({ ...gift, linkId, senderID: session.user.id, type: "text" })
})
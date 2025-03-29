import { addGift, getGiftBySenderIdAndLinkId, getGiftsByLinkId } from "@/data-access/gift";
import { getLinkById, updateLink } from "@/data-access/link";
import { authMiddleware } from "@/lib/auth-middleware";
import { getGiftsSchema, giftAddSchema } from "@/lib/validator-schemas";
import { createServerFn } from "@tanstack/react-start";



export const getGifts = createServerFn({ method: "POST" }).validator(getGiftsSchema).middleware([authMiddleware]).handler(async ({ context, data }) => {
    return await getGiftsByLinkId(data.linkId)
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
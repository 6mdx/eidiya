import { db } from "@/db/client"
import { gift } from "@/db/schema"
import { SendFormSchema } from "@/lib/validator-schemas"

export async function getGiftsByLinkId(id: string) {
    return await db.query.gift.findMany({
        where: (gift, { eq }) => eq(gift.linkId, id),
        columns: {
           senderId:false
        }
    })
}

export async function getGiftById(id: string) {
    return await db.query.gift.findFirst({
        where: (gift, { eq }) => eq(gift.id, id),
        columns: {
            senderId: false
        },
    })
}

export async function getGiftBySenderIdAndLinkId(senderId: string, linkId: string) {
    return await db.query.gift.findFirst({
        where: (gift, { eq, and }) => and(eq(gift.senderId, senderId), eq(gift.linkId, linkId))
    })
}

export async function addGift(data: SendFormSchema & { linkId: string, senderID: string, type: "text" | "voice" }) {
    return await db.insert(gift).values({
        anonymous: data.anonymous,
        name: data.name,
        text: data.message,
        type: data.type,
        linkId: data.linkId,
        senderId: data.senderID
    }).returning({ id: gift.id })
}
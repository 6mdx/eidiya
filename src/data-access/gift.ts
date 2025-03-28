import { db } from "@/db/client"

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

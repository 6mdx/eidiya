import { db } from "@/db/client";
import { Link, link } from "@/db/schema";
import { count, eq } from "drizzle-orm";


export async function getLinksByUserId(id: string) {
    return await db.query.link.findMany({
        where: (link, { eq }) => eq(link.userId, id),
        columns: {
            userId: false,
            updatedAt: false,
        },
        limit: 10
    })
}

export async function getLinkById(id: string) {
    return await db.query.link.findFirst({
        where: (link, { eq, and }) => {
            return and(eq(link.id, id), eq(link.active, true))
        },
        columns: {
            userId: false,
            updatedAt: false,
        }
    }
    )
}

export async function getLinkByIdAndUserId(id: string, userId: string) {
    return await db.query.link.findFirst({
        where: (link, { eq, and }) => and(eq(link.id, id), eq(link.userId, userId))
    })
}

export async function getLinksCount(userId: string) {
    return await db.select({ count: count()}).from(link).where(eq(link.userId, userId))
}

export async function addLink(data: Omit<Link, 'id' | 'createdAt' | 'updatedAt' | 'giftCount'>) {
    return await db.insert(link).values(data).returning({ id: link.id })
}

export async function deleteLink(id: string) {
    return await db.delete(link).where(eq(link.id, id)).returning({ id: link.title })
}

export async function updateLink(id: string, data: Partial<Link>) {
    return await db.update(link).set(data).where(eq(link.id, id)).returning({ title: link.title })
}
import { pgTable, text, timestamp, boolean, pgEnum, integer } from "drizzle-orm/pg-core"
import { init, createId } from '@paralleldrive/cuid2';
import { relations } from "drizzle-orm";

const createShortId = init({ length: 10 });

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});


export const link = pgTable("link", {
	id: text("id").primaryKey().$default(() => createShortId()),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	welcomeMessage: text('welcome_message'),
	maxGifts: integer('max_gifts').notNull().default(10),
	active: boolean('active').notNull().default(true),
	giftCount: integer('gift_count').notNull().default(0),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});


export const giftEnum = pgEnum('type', ['text', 'voice'])

export const gift = pgTable("gift", {
	id: text("id").primaryKey().$default(() => createId()),
	type: giftEnum().notNull(),
	text: text('text'),
	fileId: text('file_id'),
	linkId: text('link_id').notNull().references(() => link.id, { onDelete: 'cascade' }),
	senderId: text('sender_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const userLinksRelations = relations(user, ({ many }) => ({
	links: many(link),
}))

export const linkRelations = relations(link, ({ one }) => ({
	user: one(user, {
		fields: [link.userId],
		references: [user.id]
	})
}))

export const linkGiftsRelations = relations(link, ({ many }) => ({
	gifts: many(gift),
}))

export const giftRelations = relations(gift, ({ one }) => ({
	link: one(link, {
		fields: [gift.linkId],
		references: [link.id]
	}),
	sender: one(user, {
		fields: [gift.senderId],
		references: [user.id]
	})
}))

export type User = typeof user.$inferSelect
export type Link = typeof link.$inferSelect
export type Gift = typeof gift.$inferSelect
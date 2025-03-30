import { object, string, pipe, minLength, maxLength, InferInput, cuid2, number, minValue, maxValue, integer, boolean, optional, nullable, partial, check } from 'valibot';


export const linkFormSchema = object({
    title: pipe(
        string(),
        minLength(3, "العنوان لازم يكون اكثر من 3 حروف"),
        maxLength(50, "العنوان لازم يكون اقل من 50 حرف")
    ),
    welcomeMessage: optional(nullable(pipe(
        string(),
        minLength(10, "رسالة الترحيب لازم تكون اكثر من 10 حروف"),
        maxLength(200, "رسالة الترحيب لازم تكون اقل من 200 حرف"),
    ))),
    maxGifts: pipe(
        number(),
        integer(),
        minValue(5, "لا يمكن ان يكون عدد الهدايا اقل من 5"),
        maxValue(100, "لا يمكن ان يكون عدد الهدايا اكبر من 100")
    ),
    active: boolean()
})

export const updateLinkSchema = object({
    id: pipe(
        string(),
        cuid2()
    ),
    updatedData: partial(linkFormSchema)
})

export const linkIdSchema = object({
    id: pipe(
        string(),
        cuid2()
    )
})

export const sendFormSchema = pipe(object({
    anonymous: boolean(),
    name: optional(nullable(pipe(
        string(),
        minLength(3, "لا يمكن ان يكون الاسم اقل من 3 حروف"),
        maxLength(50, "لا يمكن ان يكون الاسم اكثر من 50 حرف")
    ))),
    message: pipe(
        string(),
        minLength(10, "لا يمكن أن تكون الرسالة أقل من 10 أحرف."),
        maxLength(250, "لا يمكن أن تكون الرسالة أكثر من 250 حرف.")
    ),
}),
    check(
        (input) => !(!input.anonymous && !input.name), "لازم تكتب الإسم إذا ماكنت مجهول"
    )
)

export const giftAddSchema = object({
    linkId: pipe(
        string(),
        cuid2()
    ),
    gift: sendFormSchema
})

export const giftDeleteSchema = object({
    id: pipe(
        string(),
        cuid2()
    ),
    linkId: pipe(
        string(),
        cuid2()
    )
})

export const getGiftsSchema = object({
    linkId: pipe(
        string(),
        cuid2()
    )
})

export type SendFormSchema = InferInput<typeof sendFormSchema>
export type LinkFormSchema = InferInput<typeof linkFormSchema>
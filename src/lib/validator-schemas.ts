import { object, string, pipe, minLength, maxLength, InferInput, cuid2, number, minValue, maxValue, integer, boolean, optional, nullable, partial } from 'valibot';


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

export const deleteLinkSchema = object({
    id: pipe(
        string(),
        cuid2()
    )
})


export type LinkFormSchema = InferInput<typeof linkFormSchema>
import { z } from "zod";
import { nanoid } from "nanoid";

export type Action = z.infer<typeof ActionSchema>;

export const ActionSchema = z.object({
    id: z.coerce.number(),
    uniqueId: z.string().optional().default(nanoid()),
    title: z.coerce.string(),
    icon: z.custom<React.ReactNode>().default([]),
});

export type ActionGroup = z.infer<typeof ActionGroupSchema>;

export const ActionGroupSchema = z.object({
    id: z.coerce.string(),
    label: z.coerce.string(),
    list: z.array(z.coerce.string()).default([]),
    actions: z.array(z.object({
        uniqueId: z.string(),
        id: z.coerce.number()
    })).default([])
});

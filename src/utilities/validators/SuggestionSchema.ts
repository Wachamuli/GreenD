import z from "zod";

export const suggestionSchema = z.object({
  subject: z.string().min(1, "Un asunto es requerido"),
  body: z.string().min(1, "Escribe los detalles"),
})

export type SuggestionSchema = z.infer<typeof suggestionSchema>;
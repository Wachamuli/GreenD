import z from "zod";

export const serviceDetailsSchema = z.object({
  details: z.array(z.string()).min(1, "Seleccione al menos un detalle."),
  calendar: z.coerce.date(),
  outsourcer: z.string().min(1, "Asigna un contrata"),
  timePicker: z.string(),
  note: z.string().optional(),
});

export type ServiceDetailsSchema = z.infer<typeof serviceDetailsSchema>;

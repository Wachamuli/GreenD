import z from "zod";

export const serviceDetailsSchema = z.object({
  details: z.array(z.string()).min(1, "Seleccione al menos un detalle."),
  outsourcer: z.string().min(1, "Asigna un contrata"),
  note: z.string().optional(),
});

export const serviceBookingSchema = z.object({
  timePicker: z.string(),
  calendar: z.coerce.date({
    errorMap: () => ({ message: "Seleccione una fecha válida" }),
  }),
});

export type ServiceDetailsSchema = z.infer<typeof serviceDetailsSchema>;
export type ServiceBookingSchema = z.infer<typeof serviceBookingSchema>;

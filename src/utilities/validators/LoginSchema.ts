import z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Correo requerido " })
    .email("Correo no válido"),
  password: z.string().min(1, { message: "Contraseña requerida " }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
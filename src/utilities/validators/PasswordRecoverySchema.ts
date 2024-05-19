import z from "zod";
import { passwordRegex } from "../utils";

export const passwordRecoverySchema = z.object({
  email: z
    .string()
    .min(1, "Correo electrónico requerido")
    .email("Correo electrónico no válido"),
  cellphone: z.string().min(1, "Número celular es requerido"),
});

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Una nueva contraseña es requerida")
      .regex(
        passwordRegex,
        "La contraseña aún es débil, agregue mayúculas y números",
      ),
    confirmPassword: z.string().min(1, "Debes confirma la contraseña"),
  })
  .refine(field => field.newPassword === field.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type PasswordRecoverySchema = z.infer<typeof passwordRecoverySchema>;
export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

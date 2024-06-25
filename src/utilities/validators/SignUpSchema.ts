import z from "zod";
import { passwordRegex } from "../utils";

export const signUpSchema = z
  .object({
    avatar: z.string().optional(),
    name: z.string().min(1, "Un nombre es necesario"),
    surname: z.string().optional(),
    email: z
      .string()
      .min(1, "Correo electrónico requerido")
      .email("Correo electrónico no válido"),
    telephone: z.string().optional(),
    cellphone: z.string().min(1, "Número celular es requerido"),
    condominium: z.string().min(1, "Seleccione un residencial"),
    address: z.string().min(1, "Una dirección es requerido"),
    password: z
      .string()
      .min(1, "Una nueva contraseña es requerida")
      .regex(
        passwordRegex,
        "La contraseña aún es débil, agregue mayúculas y números",
      ),
    confirmPassword: z.string().min(1, "Debes confirma la contraseña"),
    terms: z.literal(true, 
      { errorMap: () => ({ message: "Debes aceptar los términos y condiciones" })  },
    ),
  })
  .refine(field => field.password === field.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

import { z } from "zod";

const userSchema = z.object({
    username: z
        .string()
        .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" })
        .max(20, { message: "El nombre de usuario no puede tener mas de 20 caracteres" }),
    email: z
        .string()
        .email({ message: "Debe ser un correo electronico valido" }),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
});

const loginSchema = z.object({
    email: z
        .string()
        .email({ message: "Debe ser un correo electrónico valido" }),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
});

const validateUser = (object) => {
    return userSchema.safeParse(object)
}

const validateLogin = (object) => {
    return loginSchema.safeParse(object)
}

export const UserSchema = {
    validateUser,
    validateLogin
}

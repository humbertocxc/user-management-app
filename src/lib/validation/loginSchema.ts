import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Endereço de e-mail inválido"),
  password: z
    .string()
    .min(10, "A senha deve ter pelo menos 10 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      "A senha deve incluir pelo menos uma letra maiúscula, um número e um caractere especial"
    ),
});

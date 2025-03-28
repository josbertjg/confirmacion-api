import { userSchema } from "./user";
export const inputRegisterCatequistaSchema = userSchema.pick({
    nombre: true,
    apellido: true,
    email: true,
    cedula: true,
    phone: true,
    born_date: true,
    id_parroquia: true
});
export function validateCatequistaRegister(data) {
    return inputRegisterCatequistaSchema.safeParseAsync(data);
}

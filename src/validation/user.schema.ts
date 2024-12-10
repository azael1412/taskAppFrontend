import * as yup from 'yup'
// Esquema de validación con Yup
export const userCreateSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido').max(256),
  role_id: yup.number().required('El rol es requerido'),
  email: yup
    .string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido'),
})

export type UserCreateFormData = yup.InferType<typeof userCreateSchema>


export const userEditSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido').max(256),
  role_id: yup.number().required('El rol es requerido'),
  email: yup
    .string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  status:yup.number().required('El estado es requerido').min(0, "Estado su valor minimo debe ser 0").max(1, "Estado su valor maximo debe ser 1")
})

export type UserEditFormData = yup.InferType<typeof userEditSchema>

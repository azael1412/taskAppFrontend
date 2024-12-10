import * as yup from 'yup'

/* The `loginSchema` constant is defining a schema using the Yup library in TypeScript. This schema is
used for validating login form data. */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  remember: yup.boolean(),
})

export type LoginFormData = yup.InferType<typeof loginSchema>

/* The `forgotPasswordschema` constant is defining a schema using the Yup library in TypeScript. This
schema is used for validating form data related to a forgot password functionality. */
export const forgotPasswordschema = yup.object().shape({
  email: yup
    .string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido'),
})

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordschema>

export const resetPasswordschema = yup.object().shape({
  password: yup
  .string()
  .required('La contraseña es requerida')
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(16, 'La contraseña no puede tener más de 16 caracteres')
  .matches(/[a-z]/, 'El campo debe contener al menos una letra minúscula.')
  .matches(/[A-Z]/, 'El campo debe contener al menos una letra mayúscula.')
  .matches(/\d/, 'El campo debe contener al menos un número.')
  .matches(/[@$!%*?&.#]/, 'El campo debe contener al menos un símbolo especial (@$!%*?&.#).'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('La confirmación de contraseña es requerida'),
})

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordschema>



export const updateProfileSchema = yup.object().shape({
  email:yup.string().email().optional(),
  name: yup.string().required('El nombre es requerido').max(256),
  password: yup
  .string()
  .required('La contraseña es requerida')
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(16, 'La contraseña no puede tener más de 16 caracteres')
  .matches(/[a-z]/, 'El campo debe contener al menos una letra minúscula.')
  .matches(/[A-Z]/, 'El campo debe contener al menos una letra mayúscula.')
  .matches(/\d/, 'El campo debe contener al menos un número.')
  .matches(/[@$!%*?&.#]/, 'El campo debe contener al menos un símbolo especial (@$!%*?&.#).'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('La confirmación de contraseña es requerida'),
})

export type UpdateProfileFormData = yup.InferType<typeof updateProfileSchema>
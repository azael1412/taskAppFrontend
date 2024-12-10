import * as yup from 'yup'
// Esquema de validación con Yup
export const taskSchema = yup.object().shape({
  title: yup.string().required('El titulo es requerido').max(256),
  description: yup.string().required('La descripcion es requerido').max(10000),
  status:yup.number().required('El estado es requerido').min(0, "Estado su valor minimo debe ser 0").max(1, "Estado su valor maximo debe ser 1")
})

export type TaskFormData = yup.InferType<typeof taskSchema>
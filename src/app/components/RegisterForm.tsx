'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { I_Register } from '@/interfaces/Register.interface'


const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*]/, 'La contraseña debe contener al menos un carácter especial')
    .required('Contraseña es requerida'),
  name: Yup.string().required('Nombre es requerido'),
  address: Yup.string().required('Dirección es requerida'),
  phone: Yup.string().required('Teléfono es requerido')
})

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()

  const registerMutation = useMutation({
    mutationFn: (userData: I_Register) => 
      axios.post('http://localhost:3030/users/register', userData),
    onSuccess: () => {
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada. Por favor, inicia sesión.",
      })
      router.push('/login')
    },
    onError: () => {
      toast({
        title: "Error en el registro",
        description: "Hubo un problema al crear tu cuenta. Por favor, intenta de nuevo.",
        variant: "destructive",
      })
    },
  })

  const formik = useFormik({
    initialValues: {
		email: '',
		password: '',
		name: '',
		address: '',
		phone: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      registerMutation.mutate(values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
        ) : null}
      </div>

      <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? 'Registrando...' : 'Registrarse'}
      </Button>
    </form>
  )
}


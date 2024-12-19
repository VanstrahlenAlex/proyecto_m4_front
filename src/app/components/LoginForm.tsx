'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { I_Login } from '@/interfaces/Login.interface'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email es requerido'),
  password: Yup.string().required('Contraseña es requerida')
})

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()

  const loginMutation = useMutation({
    mutationFn: (credentials: I_Login) => 
      axios.post('http://localhost:3030/users/login', credentials),
    onSuccess: (response) => {
      const { token, user } = response.data
      login(token, user)
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta!",
      })
      router.push('/dashboard')
    },
    onError: () => {
      toast({
        title: "Error de inicio de sesión",
        description: "Email o contraseña incorrectos. Por favor, intenta de nuevo.",
        variant: "destructive",
      })
    },
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values)
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

      <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  )
}


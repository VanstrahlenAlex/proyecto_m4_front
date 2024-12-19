import RegisterForm from "@/app/components/RegisterForm";
import Link from "next/link";


export default function RegisterPage() {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
			Crear una cuenta
			</h2>
		</div>

		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<RegisterForm />
			</div>
			<p className="pt-4 items-center text-center">¿Ya tienes una cuenta? <Link href="/login" className="text-blue-500 hover:underline">Incia sesión</Link></p>
		</div>
		
		</div>
	)
}


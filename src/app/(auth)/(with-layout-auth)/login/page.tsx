import LoginForm from "@/app/components/LoginForm";
import Link from "next/link";


export default function LoginPage() {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Iniciar Sesión
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<LoginForm />
				</div>
				<p className="pt-4 items-center justify-center text-center">¿No tienes una cuenta aún? <Link href="/register" className="text-blue-500 hover:underline">Registrate</Link></p>
			</div>
			
		</div>
	)
}


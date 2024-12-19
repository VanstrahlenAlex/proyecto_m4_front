import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link href="/">
          <Button>
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}


export default function Footer() {
	const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#E2D5D5] py-6 mt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-black mb-4 md:mb-0">
            © {currentYear} E-commerce. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-gray-700">Términos</a>
            <a href="#" className="text-black hover:text-gray-700">Privacidad</a>
            <a href="#" className="text-black hover:text-gray-700">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref className="text-2xl font-bold">
          GameVerse
        </Link>
        <div className="space-x-4">
          <Link href="/" passHref className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/admin" passHref className="hover:text-gray-300">
            Admin
          </Link>
          {/* Adicionaremos a lógica de login/logout aqui no futuro */}
        </div>
      </nav>
    </header>
  );
}
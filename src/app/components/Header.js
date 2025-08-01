'use client'; // Torna este componente um 'Client Component'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, removeToken } from '../services/auth';

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verifica o status de autenticação no carregamento da página
    setIsLogged(isAuthenticated());
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLogged(false);
    router.push('/admin'); // Redireciona para a página de login após o logout
  };

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
          {isLogged ? (
            <>
              {/* Opções para usuário logado */}
              <Link href="/admin/dashboard" passHref className="hover:text-gray-300">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300">
                Sair
              </button>
            </>
          ) : (
            // Opção para usuário não logado
            <Link href="/admin/login" passHref className="hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
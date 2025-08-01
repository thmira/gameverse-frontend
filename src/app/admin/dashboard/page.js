'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPosts } from '../../services/api';
import { isAuthenticated, getToken } from '../../services/auth';

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Proteger a página: Redirecionar se o usuário não estiver autenticado
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // 2. Buscar os posts
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Erro ao buscar posts para o dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [router]);

  const handleDelete = async (postId) => {
    // Lógica para excluir o post - implementaremos em breve!
    if (window.confirm('Tem certeza que deseja excluir esta postagem?')) {
      // Simulação de exclusão por enquanto
      console.log(`Excluindo post com ID: ${postId}`);
      alert('Funcionalidade de exclusão será implementada em breve!');
    }
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <p>Carregando posts...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard do Administrador</h1>
        <Link href="/admin/posts/new" passHref className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Criar Novo Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma postagem encontrada.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Título</th>
                <th className="py-3 px-6 text-left">Autor</th>
                <th className="py-3 px-6 text-left">Categoria</th>
                <th className="py-3 px-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {posts.map(post => (
                <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{post.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{post.author?.username || 'Desconhecido'}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{post.category}</span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <Link href={`/admin/posts/edit/${post._id}`} passHref className="text-green-600 hover:text-green-800" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </Link>
                      <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:text-red-800" title="Excluir">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
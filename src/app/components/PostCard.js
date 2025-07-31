import Link from 'next/link';

export default function PostCard({ post }) {
  // Verificação de dados para evitar erros se o post não tiver autor
  const authorUsername = post.author?.username || 'Autor Desconhecido';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Se houver uma imagem, exibe-a no topo do card */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span>Por: {authorUsername}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <Link href={`/posts/${post._id}`} passHref className="block">
          <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mt-2 line-clamp-3">
          {post.content}
        </p>
        <div className="mt-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {post.category}
          </span>
        </div>
      </div>
    </div>
  );
}
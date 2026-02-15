import { useNavigate } from 'react-router';

export default function CreateDefaultNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 px-4">
      <h1 className="text-6xl font-black tracking-tighter text-white">404</h1>
      <p className="text-gray-500 max-w-md">
        The page you are looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all text-sm uppercase tracking-widest"
      >
        Go Back Home
      </button>
    </div>
  );
}

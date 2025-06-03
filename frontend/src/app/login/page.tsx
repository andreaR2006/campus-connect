'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      // Stocker le token JWT dans localStorage
      localStorage.setItem('token', data.token);

      // Redirection vers la page chat
      router.push('/chat');
    } catch (error) {
      console.error('Erreur réseau :', error);
      setErrorMsg('Erreur réseau. Veuillez réessayer.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        noValidate
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Connexion</h2>

        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Votre adresse email"
          className="w-full p-3 mb-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        {errorMsg && (
          <p className="mb-4 text-red-600 font-medium text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold transition ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>
      </form>
    </div>
  );
}

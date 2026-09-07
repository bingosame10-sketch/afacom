import React, { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { loginAdmin } from '../services/api';

interface AdminLoginProps {
  onAuthenticated: (accessToken: string, email: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await loginAdmin(email, password);
      onAuthenticated(result.accessToken, result.email);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Connexion impossible');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F6F5] px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md border border-[#E5E2DE] bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-[#002395] text-white"><LockKeyhole className="h-5 w-5" /></div>
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#002395]">Espace sécurisé</p>
            <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Administration</h1>
          </div>
        </div>
        <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-[#4A443F]">
          Email administrateur
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="mt-2 w-full border border-[#E5E2DE] p-3 text-sm font-normal outline-none focus:border-[#002395]" />
        </label>
        <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-[#4A443F]">
          Mot de passe
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="mt-2 w-full border border-[#E5E2DE] p-3 text-sm font-normal outline-none focus:border-[#002395]" />
        </label>
        {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="w-full bg-[#1A1A1A] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#002395] disabled:opacity-50">
          {loading ? 'Vérification...' : 'Se connecter'}
        </button>
      </form>
    </main>
  );
};

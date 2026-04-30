'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import { FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signUp.email({
      email,
      password,
      name,
      callbackURL: '/',
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created successfully!');
      router.push('/');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 pt-24">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 animate__animated animate__fadeIn">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter uppercase">
            Join Us
          </h2>
          <p className="text-sm opacity-50 mt-2">
            Start your artistic journey today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full pl-12 rounded-2xl focus:ring-2 focus:ring-primary"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full pl-12 rounded-2xl focus:ring-2 focus:ring-primary"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="password"
              placeholder="Create Password"
              className="input input-bordered w-full pl-12 rounded-2xl focus:ring-2 focus:ring-primary"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full rounded-2xl shadow-lg shadow-primary/20 ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>
        </form>

        <div className="divider my-8 uppercase text-[10px] font-bold opacity-30 tracking-widest">
          OR Continue with
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full rounded-2xl gap-3 border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          <FaGoogle /> Google Account
        </button>

        <p className="text-center mt-10 text-sm font-medium text-slate-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaLink } from 'react-icons/fa'; 
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(''); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signUp.email({
      email,
      password,
      name,
      image,
      callbackURL: '/',
    });

    if (error) {
      if (error.message.includes('already exists')) {
        toast.error('This email is already registered!');
      } else {
        toast.error(error.message || 'Registration failed. Please try again!');
      }
    } else {
      toast.success('Account created successfully! Please login.', {
        duration: 3000,
        icon: '✅',
      });
      router.push('/login');
    }
    setLoading(false);
  };


  const handleGoogleLogin = async () => {
    await signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 pt-24">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter uppercase">
            Join Us
          </h2>
          <p className="text-sm opacity-50 mt-2">
            Start your artistic journey today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full pl-12 rounded-2xl"
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
              className="input input-bordered w-full pl-12 rounded-2xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Photo URL Field */}
          <div className="relative">
            <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="url"
              placeholder="Photo URL (Link)"
              className="input input-bordered w-full pl-12 rounded-2xl"
              value={image}
              onChange={e => setImage(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="password"
              placeholder="Create Password"
              className="input input-bordered w-full pl-12 rounded-2xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full rounded-2xl ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Registering...' : 'Register Now'}
          </button>
        </form>

        <div className="divider my-8 uppercase text-[10px] font-bold opacity-30">
          OR
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full rounded-2xl gap-3"
        >
          <FaGoogle /> Google Account
        </button>

        <p className="text-center mt-10 text-sm font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { HiOutlineUser, HiOutlineLink, HiOutlineSave } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function UpdateProfileForm({ user }) {
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.updateUser({
      name: name,
      image: image,
    });
    if (error) {
      
      toast.error('Failed to update profile. Please try again!');
    } else {
      
      toast.success('Profile updated successfully!', {
        duration: 3000,
        icon: '✅',
      });
      router.push('/my-profile');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">
          Full Name
        </label>
        <div className="relative">
          <HiOutlineUser
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
            size={20}
          />
          <input
            type="text"
            className="input input-bordered w-full pl-12 rounded-2xl h-14"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">
          Profile Photo URL
        </label>
        <div className="relative">
          <HiOutlineLink
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
            size={20}
          />
          <input
            type="url"
            className="input input-bordered w-full pl-12 rounded-2xl h-14"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`btn btn-primary w-full h-14 rounded-2xl shadow-xl shadow-primary/20 gap-3 text-lg ${loading ? 'loading' : ''}`}
      >
        {loading ? 'Updating...' : 'Update Information'}
        {!loading && <HiOutlineSave size={22} />}
      </button>
    </form>
  );
}

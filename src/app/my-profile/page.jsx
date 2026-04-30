import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineArrowNarrowLeft,
  HiOutlineUser,
} from 'react-icons/hi';
import Link from 'next/link';
import LogoutButton from '@/components/ui/LogoutButton';

export default async function ProfilePage() {
  // Fetch server-side session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // if no session, redirect to login page
  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-slate-50/50">
      <div className="container mx-auto max-w-4xl">
        {/* User Profile Card */}
        <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>

          {/* Profile Image Section */}
          <div className="relative group">
            <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden ring-8 ring-slate-50 shadow-2xl transition-transform duration-500 hover:scale-105">
              <img
                src={
                  user.image || `https://ui-avatars.com/api/?name=${user.name}`
                }
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-2xl shadow-xl">
              <HiOutlineUser size={24} />
            </div>
          </div>

          {/* User Info Details */}
          <div className="flex-grow space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
                {user.name}
              </h1>
              <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
                Verified Member since {new Date(user.createdAt).getFullYear()}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex items-center justify-center md:justify-start gap-4 text-slate-600 font-medium">
                <div className="bg-slate-100 p-2 rounded-lg text-primary">
                  <HiOutlineMail size={20} />
                </div>
                <span className="text-sm md:text-base">{user.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-slate-600 font-medium">
                <div className="bg-slate-100 p-2 rounded-lg text-primary">
                  <HiOutlineCalendar size={20} />
                </div>
                <span className="text-sm md:text-base">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
              <LogoutButton />
              <Link
                href="/my-profile/update"
                className="btn btn-primary rounded-2xl px-10 shadow-lg shadow-primary/20"
              >
                Update Profile
              </Link>
              <Link
                href="/all-tiles"
                className="btn btn-ghost rounded-2xl px-8 gap-3 font-bold text-slate-500 hover:text-primary"
              >
                <HiOutlineArrowNarrowLeft /> Browse Tiles
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center space-y-2 group hover:border-primary transition-all duration-300">
            <p className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors">
              12
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Favorite Tiles
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center space-y-2 group hover:border-primary transition-all duration-300">
            <p className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors">
              05
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Past Orders
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center space-y-2 text-primary group hover:bg-primary hover:text-white transition-all duration-300">
            <p className="text-3xl font-black italic">PRO</p>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
              Account Status
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

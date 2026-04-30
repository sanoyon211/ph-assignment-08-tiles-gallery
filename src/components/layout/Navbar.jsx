'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import {
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineUserCircle,
  HiLogout,
  HiUser,
  HiMenuAlt3,
  HiX,
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // স্ক্রল ডিটেক্ট করা
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // অ্যাক্টিভ লিঙ্ক চেক করার ফাংশন
  const isActive = path => pathname === path;
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-xl py-3'
          : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary text-white p-2 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary/20">
            <HiOutlineViewGrid size={26} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
            Tile<span className="text-primary">Gallery</span>
          </span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-bold text-[11px] uppercase tracking-[0.2em]">
          <Link
            href="/"
            className={`flex items-center gap-2 transition-all duration-300 ${isActive('/') ? 'text-primary scale-110' : 'text-slate-500 hover:text-primary'}`}
          >
            <HiOutlineHome size={18} /> Home
          </Link>
          <Link
            href="/all-tiles"
            className={`flex items-center gap-2 transition-all duration-300 ${isActive('/all-tiles') ? 'text-primary scale-110' : 'text-slate-500 hover:text-primary'}`}
          >
            <HiOutlineViewGrid size={18} /> Gallery
          </Link>
          {session && (
            <Link
              href="/my-profile"
              className={`flex items-center gap-2 transition-all duration-300 ${isActive('/my-profile') ? 'text-primary scale-110' : 'text-slate-500 hover:text-primary'}`}
            >
              <HiOutlineUserCircle size={18} /> Profile
            </Link>
          )}
        </div>
        {/* Right Side: User & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="skeleton w-10 h-10 rounded-2xl bg-slate-100"></div>
          ) : session ? (
            <div className="dropdown dropdown-end hidden md:block">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-primary/20 p-0.5 hover:border-primary transition-all"
              >
                <div className="w-10 rounded-xl overflow-hidden shadow-lg">
                  <img
                    alt="User"
                    src={
                      session.user.image ||
                      `https://ui-avatars.com/api/?name=${session.user.name}`
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-64 border border-slate-100 animate__animated animate__fadeInUp"
              >
                <li className="px-4 py-4 mb-2 bg-slate-50 rounded-xl">
                  <span className="font-black text-slate-900 text-sm">
                    {session.user.name}
                  </span>
                  <span className="text-[10px] opacity-50 truncate">
                    {session.user.email}
                  </span>
                </li>
                <li>
                  <Link href="/my-profile" className="py-3">
                    <HiUser size={18} /> Manage Profile
                  </Link>
                </li>
                <div className="divider my-1 opacity-50"></div>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="py-3 text-error hover:bg-error/10"
                  >
                    <HiLogout size={18} /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex btn btn-primary rounded-2xl px-10 shadow-lg shadow-primary/20 hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest"
            >
              Login
            </Link>
          )}
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-slate-900 bg-slate-100 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Sidebar/Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-8 flex flex-col gap-8 font-black uppercase tracking-[0.2em] text-[10px] animate__animated animate__fadeInDown">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-4 ${isActive('/') ? 'text-primary' : 'text-slate-500'}`}
          >
            <HiOutlineHome size={20} /> Home Page
          </Link>
          <Link
            href="/all-tiles"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-4 ${isActive('/all-tiles') ? 'text-primary' : 'text-slate-500'}`}
          >
            <HiOutlineViewGrid size={20} /> Browse Gallery
          </Link>
          {session ? (
            <>
              <Link
                href="/my-profile"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 ${isActive('/my-profile') ? 'text-primary' : 'text-slate-500'}`}
              >
                <HiUser size={20} /> My Profile
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="text-error flex items-center gap-4 text-left"
              >
                <HiLogout size={20} /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary rounded-2xl w-full"
            >
              Login Account
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        {/*  LEFT */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-2 rounded-xl">
            <HiOutlineViewGrid size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            Tile<span className="text-primary">Gallery</span>
          </span>
        </Link>

        {/*  CENTRE */}
        <div className="hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.2em]">
          <Link
            href="/"
            className={`hover:text-primary transition-all ${isActive('/') ? 'text-primary pb-1 border-b border-primary' : 'text-slate-500'}`}
          >
            Home
          </Link>
          <Link
            href="/all-tiles"
            className={`hover:text-primary transition-all ${isActive('/all-tiles') ? 'text-primary pb-1 border-b border-primary' : 'text-slate-500'}`}
          >
            All Tiles
          </Link>
          {session && (
            <Link
              href="/my-profile"
              className={`hover:text-primary transition-all ${isActive('/my-profile') ? 'text-primary pb-1 border-b border-primary' : 'text-slate-500'}`}
            >
              My Profile
            </Link>
          )}
        </div>

        {/*  RIGHT  */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="skeleton w-8 h-8 rounded-full bg-slate-100"></div>
          ) : session ? (
            /* Logged In State: Profile Image + Logout Button */
            <div className="flex items-center gap-4">
              <Link
                href="/my-profile"
                className="btn btn-ghost btn-circle avatar border-2 border-primary/20 p-0.5 hover:border-primary transition-all"
              >
                <div className="w-8 rounded-lg overflow-hidden">
                  <img
                    src={
                      session.user.image ||
                      `https://ui-avatars.com/api/?name=${session.user.name}`
                    }
                    alt="Profile"
                  />
                </div>
              </Link>
              <button
                onClick={() => signOut()}
                className="hidden sm:flex btn btn-ghost btn-sm gap-2 text-error font-bold text-[10px] uppercase tracking-widest border-2 border-error/10 rounded-xl hover:bg-error hover:text-white"
              >
                <HiLogout size={16} /> Logout
              </button>
            </div>
          ) : (
            /* Logged Out State: Login Button */
                <div className='hidden md:block'>
                  <Link
              href="/login"
              className="btn btn-primary btn-sm rounded-xl px-8 shadow-lg shadow-primary/20 text-[10px] font-bold uppercase tracking-widest "
            >
              Login
            </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-900 bg-slate-100 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu  */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-8 flex flex-col gap-6 font-bold uppercase text-[10px] tracking-widest animate__animated animate__fadeInDown">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={isActive('/') ? 'text-primary' : 'text-slate-500'}
          >
            Home
          </Link>
          <Link
            href="/all-tiles"
            onClick={() => setIsMenuOpen(false)}
            className={
              isActive('/all-tiles') ? 'text-primary' : 'text-slate-500'
            }
          >
            All Tiles
          </Link>
          {session ? (
            <>
              <Link
                href="/my-profile"
                onClick={() => setIsMenuOpen(false)}
                className={
                  isActive('/my-profile') ? 'text-primary' : 'text-slate-500'
                }
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="text-error flex items-center gap-2 uppercase"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary rounded-xl w-full"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

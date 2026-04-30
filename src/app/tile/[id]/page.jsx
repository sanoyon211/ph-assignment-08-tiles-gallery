import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import Link from 'next/link';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineShoppingBag,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

export default async function TileDetailsPage({ params }) {
  // ১. সেশন চেক লজিক (এটি যোগ করুন)
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/login');
  }
  const { id } = await params;
  // ২. ফেচিং পার্ট (try-catch ব্যবহার করা ভালো)
  let tile = null;
  try {
    const res = await fetch('https://auth-0-kappa.vercel.app/tilesData.json', {
      cache: 'no-store',
    });
    const tiles = await res.json();
    tile = tiles.find(t => t.id == id);
  } catch (error) {
    console.error('Error fetching tile data:', error);
  }
  if (!tile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold opacity-30 uppercase tracking-widest">
          Tile Not Found
        </h2>
        <Link href="/all-tiles" className="btn btn-primary rounded-2xl">
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 bg-slate-50/50">
      <div className="container mx-auto">
        {/* Back Button */}
        <Link
          href="/all-tiles"
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 font-bold uppercase text-xs tracking-widest"
        >
          <HiOutlineArrowNarrowLeft size={20} /> Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left: Image Section */}
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-white p-4">
            <img
              src={tile.image}
              alt={tile.title}
              className="w-full h-full object-cover rounded-[2.5rem]"
            />
          </div>

          {/* Right: Info Section */}
          <div className="space-y-4 md:space-y-8">
            <div className="space-y-4">
              <span className="badge badge-primary badge-outline font-black uppercase tracking-widest text-[10px] px-4 py-3">
                {tile.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                {tile.title}
              </h1>
              <div className="flex items-center gap-2 text-success font-bold text-sm">
                <HiOutlineCheckCircle size={20} />{' '}
                {tile.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
              {tile.description}
            </p>

            <div className="p-3 md:p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Premium Price
                  </p>
                  <p className="text-2xl md:text-5xl font-black text-slate-900">
                    ${tile.price}
                  </p>
                </div>
                <button className="w-full sm:w-auto btn btn-primary btn-lg rounded-2xl px-10 shadow-xl shadow-primary/30 gap-3">
                  <HiOutlineShoppingBag size={24} /> Order Now
                </button>
              </div>
            </div>

            {/* Specification Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-100/50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Material
                </p>
                <p className="font-black text-slate-800">
                  {tile.material || 'High-grade Ceramic'}
                </p>
              </div>
              <div className="p-6 bg-slate-100/50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Designer
                </p>
                <p className="font-black text-slate-800">
                  {tile.creator || 'Tile Gallery Elite'}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {tile.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase text-slate-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

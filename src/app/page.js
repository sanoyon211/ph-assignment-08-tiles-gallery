import Banner from '@/components/ui/Bannar';
import TileCard from '@/components/ui/TileCard';
import { HiStar } from 'react-icons/hi';
import Link from 'next/link';



export default async function Home() {
  const res = await fetch('https://auth-0-kappa.vercel.app/tilesData.json', {
    cache: 'no-store',
  });

  const tilesData = await res.json();
  const featuredTiles = tilesData.slice(0, 4);

  return (
    <main className="flex flex-col min-h-screen">
      <Banner />

      {/* Scrolling Marquee */}
      <div className="bg-primary py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="flex gap-12 items-center text-black font-black text-sm uppercase tracking-[0.3em] px-6"
            >
              <span>Exclusive New Arrivals</span>
              <HiStar size={20} />
              <span >Premium Artistic Collection</span>
              <HiStar size={20} />
              <span>Weekly Modern Geometric Feature</span>
              <HiStar size={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-24 px-6 md:px-12 bg-slate-50/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-primary"></div>
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
                  Premium Picks
                </span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                Featured <span className="italic font-light">Gallery</span>
              </h3>
            </div>
            <Link
              href="/all-tiles"
              className="group flex items-center gap-3 font-bold text-sm uppercase tracking-widest text-slate-900 hover:text-primary transition-colors"
            >
              Explore All Tiles{' '}
              <HiStar className="group-hover:rotate-180 transition-transform duration-500" />
            </Link>
          </div>

          {tilesData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTiles.map(tile => (
                <TileCard key={tile.id} tile={tile} />
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-[3rem] shadow-sm border border-slate-100">
              <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
              <p className="font-bold opacity-30 uppercase tracking-widest text-xs">
                Fetching latest tiles...
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

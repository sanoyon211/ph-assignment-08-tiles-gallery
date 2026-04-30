import Link from 'next/link';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export default function TileCard({ tile }) {
  return (
    <div className="group relative bg-white rounded-2xl p-3 border border-primary/25 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2">
      {/* Image Container */}
      <div className="aspect-[4/5] rounded-2xl overflow-hidden relative mb-6">
        <img
          src={tile.image}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          alt={tile.title}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
            {tile.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-3 pb-4 space-y-4">
        <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 italic">
          {tile.title}
        </h4>

        <div className="flex justify-between items-end border-t border-slate-50 pt-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Starting from
            </p>
            <p className="text-2xl font-black text-slate-900">${tile.price}</p>
          </div>
          <Link
            href={`/tile/${tile.id}`}
            className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all duration-300 shadow-lg"
          >
            <HiOutlineArrowNarrowRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}

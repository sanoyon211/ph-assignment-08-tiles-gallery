'use client';
import { useState } from 'react';
import TileCard from './TileCard';
import { HiSearch } from 'react-icons/hi';

export default function TileList({ initialTiles }) {
  const [searchQuery, setSearchQuery] = useState('');

  // filter tiles based on search query
  const filteredTiles = initialTiles.filter(tile =>
    tile.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-12">
      {/* Modern Search Bar */}
      <div className="max-w-2xl mx-auto relative group">
        <div className="absolute inset-0 bg-primary/20 blur-2xl group-focus-within:bg-primary/30 transition-all rounded-full"></div>
        <div className="relative flex items-center">
          <HiSearch className="absolute left-6 text-slate-400" size={24} />
          <input
            type="text"
            placeholder="Search for your perfect tiles..."
            className="input input-lg w-full h-16 pl-16 pr-6 rounded-full bg-white border-none shadow-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tiles Grid */}
      {filteredTiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTiles.map(tile => (
            <TileCard key={tile.id} tile={tile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🔍</div>
          <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">
            No tiles found
          </h3>
          <p className="text-slate-400">Try searching for something else!</p>
        </div>
      )}
    </div>
  );
}

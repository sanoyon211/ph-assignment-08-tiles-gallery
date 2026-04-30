import TileList from '@/components/ui/TileList';

async function getAllTiles() {
  const res = await fetch('https://auth-0-kappa.vercel.app/tilesData.json', {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function AllTilesPage() {
  const allTiles = await getAllTiles();

  return (
    <main className="min-h-screen bg-slate-50/50 pt-32 pb-24 px-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-black uppercase tracking-[0.4em] text-xs">
            The Gallery
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Explore Our{' '}
            <span className="italic font-light">Full Collection</span>
          </h1>
        </div>

        {/* Interactive Tile List (Search & Grid) */}
        <TileList initialTiles={allTiles} />
      </div>
    </main>
  );
}

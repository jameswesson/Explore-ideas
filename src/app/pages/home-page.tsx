import { Navbar } from '../components/navbar';
import { SearchForm } from '../components/search-form';
import { Hotel, Car, Palmtree, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0770e3] to-[#0553b5]">
      <div className="pb-12">
        <Navbar />

        <div className="max-w-7xl mx-auto px-8 mt-16">
          <SearchForm />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-4">
          <button className="bg-white/10 backdrop-blur-sm text-white p-8 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-colors">
            <Hotel className="w-6 h-6" />
            <span className="text-lg">Hotels</span>
          </button>
          <button className="bg-white/10 backdrop-blur-sm text-white p-8 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-colors">
            <Car className="w-6 h-6" />
            <span className="text-lg">Cars</span>
          </button>
          <button className="bg-white/10 backdrop-blur-sm text-white p-8 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-colors">
            <Palmtree className="w-6 h-6" />
            <span className="text-lg">Packages</span>
          </button>
          <button className="bg-white/10 backdrop-blur-sm text-white p-8 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-colors">
            <Globe className="w-6 h-6" />
            <span className="text-lg">Explore</span>
          </button>
        </div>
      </div>
    </div>
  );
}

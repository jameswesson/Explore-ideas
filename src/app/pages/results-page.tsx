import { useState } from 'react';
import { Link } from 'react-router';
import { Sun, Heart, User } from 'lucide-react';
import { DestinationCard } from '../components/destination-card';
import { DestinationModal } from '../components/destination-modal';
import { Button } from '../components/ui/button';

const destinations = [
  {
    destination: 'Bali',
    country: 'Indonesia',
    imageUrl: 'https://images.unsplash.com/photo-1698466632744-f79b37b88ffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 389,
    bestMonth: 'June - September',
    cheapestMonth: 'February',
    cheapestPrice: 359,
    bestWeatherTemp: '28°C',
    insiderTip: 'Visit Ubud in early October for fewer crowds and still-great weather, with rice terraces at their greenest.',
    priceRange: [
      { month: 'Jan', price: 380 },
      { month: 'Feb', price: 359 },
      { month: 'Mar', price: 375 },
      { month: 'Apr', price: 395 },
      { month: 'May', price: 420 },
      { month: 'Jun', price: 389 },
    ],
  },
  {
    destination: 'Paris',
    country: 'France',
    imageUrl: 'https://images.unsplash.com/photo-1594719606220-ad0ae5cca3ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 89,
    bestMonth: 'April - June',
    cheapestMonth: 'January',
    cheapestPrice: 65,
    bestWeatherTemp: '22°C',
    insiderTip: 'Paris is at its best in May and September—warm weather without peak summer crowds.',
    priceRange: [
      { month: 'Jan', price: 65 },
      { month: 'Feb', price: 72 },
      { month: 'Mar', price: 85 },
      { month: 'Apr', price: 89 },
      { month: 'May', price: 95 },
      { month: 'Jun', price: 102 },
    ],
  },
  {
    destination: 'Tokyo',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1633257259805-8a6f15fe1de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 549,
    bestMonth: 'March - May',
    cheapestMonth: 'January',
    cheapestPrice: 485,
    bestWeatherTemp: '20°C',
    insiderTip: 'Late March through early April is cherry blossom season—book well in advance for this magical time.',
    priceRange: [
      { month: 'Jan', price: 485 },
      { month: 'Feb', price: 502 },
      { month: 'Mar', price: 549 },
      { month: 'Apr', price: 575 },
      { month: 'May', price: 560 },
      { month: 'Jun', price: 520 },
    ],
  },
  {
    destination: 'Maldives',
    country: 'Maldives',
    imageUrl: 'https://images.unsplash.com/photo-1714412192114-61dca8f15f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 689,
    bestMonth: 'November - April',
    cheapestMonth: 'May',
    cheapestPrice: 599,
    bestWeatherTemp: '30°C',
    insiderTip: 'May offers great value with occasional rain showers that are short-lived—perfect for budget-conscious travelers.',
    priceRange: [
      { month: 'Jan', price: 689 },
      { month: 'Feb', price: 695 },
      { month: 'Mar', price: 679 },
      { month: 'Apr', price: 650 },
      { month: 'May', price: 599 },
      { month: 'Jun', price: 615 },
    ],
  },
  {
    destination: 'New York',
    country: 'United States',
    imageUrl: 'https://images.unsplash.com/photo-1570304816841-906a17d7b067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 329,
    bestMonth: 'April - June',
    cheapestMonth: 'February',
    cheapestPrice: 289,
    bestWeatherTemp: '24°C',
    insiderTip: 'January sales and Restaurant Week offer incredible deals, just brave the cold for big savings.',
    priceRange: [
      { month: 'Jan', price: 305 },
      { month: 'Feb', price: 289 },
      { month: 'Mar', price: 310 },
      { month: 'Apr', price: 329 },
      { month: 'May', price: 345 },
      { month: 'Jun', price: 359 },
    ],
  },
  {
    destination: 'Barcelona',
    country: 'Spain',
    imageUrl: 'https://images.unsplash.com/photo-1664017056515-b4c6a5c46bcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 79,
    bestMonth: 'May - June',
    cheapestMonth: 'November',
    cheapestPrice: 52,
    bestWeatherTemp: '26°C',
    insiderTip: 'Barcelona in late October offers warm sea temperatures but far fewer tourists.',
    priceRange: [
      { month: 'Jan', price: 65 },
      { month: 'Feb', price: 62 },
      { month: 'Mar', price: 70 },
      { month: 'Apr', price: 75 },
      { month: 'May', price: 79 },
      { month: 'Jun', price: 85 },
    ],
  },
];

export default function ResultsPage() {
  const [preferenceStage, setPreferenceStage] = useState<'budget' | 'distance' | 'complete'>('budget');
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);

  const budgetPreferences = [
    { id: 'cheap', label: 'Cheap breaks' },
    { id: 'adventurous', label: 'Adventurous destinations' },
    { id: 'favourites', label: 'Traveller favourites' },
    { id: 'luxury', label: 'Luxury escapes' },
    { id: 'lastminute', label: 'Last minute deals' },
    { id: 'weekend', label: 'Weekend getaways' },
    { id: 'hidden', label: 'Hidden gems' },
    { id: 'cultural', label: 'Cultural experiences' },
  ];

  const distancePreferences = [
    { id: 'nearby', label: 'Nearby trips' },
    { id: 'longhaul', label: 'Long-haul travels' },
    { id: 'alternative', label: 'Alternative spots' },
    { id: 'exotic', label: 'Exotic locations' },
    { id: 'european', label: 'European cities' },
    { id: 'islands', label: 'Island hopping' },
    { id: 'remote', label: 'Off the beaten path' },
    { id: 'trending', label: 'Trending destinations' },
  ];

  const [visibleBudgetChips, setVisibleBudgetChips] = useState<string[]>(['cheap', 'adventurous', 'favourites']);
  const [visibleDistanceChips, setVisibleDistanceChips] = useState<string[]>(['nearby', 'longhaul', 'alternative']);

  const handleBudgetSelection = (id: string) => {
    setSelectedBudget([...selectedBudget, id]);
    const remainingVisible = visibleBudgetChips.filter(chipId => chipId !== id);
    const usedChips = [...selectedBudget, id, ...remainingVisible];
    const nextChip = budgetPreferences.find(pref => !usedChips.includes(pref.id));
    setVisibleBudgetChips(nextChip ? [...remainingVisible, nextChip.id] : remainingVisible);

    if (selectedBudget.length + 1 >= 3) {
      setIsTransitioning(true);
      setTimeout(() => { setIsTransitioning(false); setPreferenceStage('distance'); }, 600);
    }
  };

  const handleDistanceSelection = (id: string) => {
    setSelectedDistance([...selectedDistance, id]);
    const remainingVisible = visibleDistanceChips.filter(chipId => chipId !== id);
    const usedChips = [...selectedDistance, id, ...remainingVisible];
    const nextChip = distancePreferences.find(pref => !usedChips.includes(pref.id));
    setVisibleDistanceChips(nextChip ? [...remainingVisible, nextChip.id] : remainingVisible);

    if (selectedDistance.length + 1 >= 3) {
      setIsTransitioning(true);
      setTimeout(() => { setIsTransitioning(false); setPreferenceStage('complete'); }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full py-4 px-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#0770e3]">
            <Sun className="w-8 h-8" />
            <span className="text-2xl">Skyscanner</span>
          </Link>
          <div className="flex items-center gap-6 text-gray-700">
            <button className="hover:text-gray-900">Help</button>
            <button className="hover:text-gray-900"><Sun className="w-6 h-6" /></button>
            <button className="hover:text-gray-900"><Heart className="w-6 h-6" /></button>
            <button className="flex items-center gap-2 hover:text-gray-900">
              <User className="w-6 h-6" />
              <span>Log in</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Summary Bar */}
      <div className="bg-[#0770e3] border-b border-[#0553b5] py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white/80">London (Any)</span>
            <span className="text-white/60">→</span>
            <span className="text-white">Everywhere</span>
            <span className="text-white/60">|</span>
            <span className="text-white">Anytime</span>
            <span className="text-white/60">|</span>
            <span className="text-white/80">1 Adult, Economy</span>
          </div>
          <Link to="/">
            <Button variant="outline" className="bg-white text-[#0770e3] border-white hover:bg-white/90">Edit search</Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-4">
          <h1 className="text-4xl mb-2">Explore</h1>
          <p className="text-gray-600 text-lg">Discover when and where to go next.</p>
        </div>

        {/* Preferences Banner */}
        {preferenceStage !== 'complete' && (
          <div className={`bg-[#0770e3] rounded-lg border border-[#0770e3] p-4 mb-8 transition-opacity duration-500 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center gap-4 flex-1">
              <span className="text-sm text-white">Let us know what you're after</span>

              {preferenceStage === 'budget' && (
                <div className="flex gap-2">
                  {visibleBudgetChips.map(chipId => {
                    const preference = budgetPreferences.find(pref => pref.id === chipId);
                    if (!preference) return null;
                    return (
                      <button
                        key={chipId}
                        onClick={() => handleBudgetSelection(chipId)}
                        disabled={isTransitioning}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedBudget.includes(chipId) ? 'bg-white text-[#0770e3]' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {preference.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {preferenceStage === 'distance' && (
                <div className="flex gap-2">
                  {visibleDistanceChips.map(chipId => {
                    const preference = distancePreferences.find(pref => pref.id === chipId);
                    if (!preference) return null;
                    return (
                      <button
                        key={chipId}
                        onClick={() => handleDistanceSelection(chipId)}
                        disabled={isTransitioning}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedDistance.includes(chipId) ? 'bg-white text-[#0770e3]' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {preference.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <Button className="rounded-full bg-[#00203f] text-white hover:bg-[#003052] border-0">All destinations</Button>
          <Button variant="outline" className="rounded-full bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100">Beach</Button>
          <Button variant="outline" className="rounded-full bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100">City break</Button>
          <Button variant="outline" className="rounded-full bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100">Adventure</Button>
          <Button variant="outline" className="rounded-full bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100">Nature</Button>
        </div>

        {/* Destination Cards */}
        <div className="space-y-6">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              {...destination}
              onExplore={() => setSelectedDestination(destination)}
            />
          ))}
        </div>
      </div>

      {selectedDestination && (
        <DestinationModal
          {...selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  );
}

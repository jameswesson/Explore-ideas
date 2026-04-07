import { X, Calendar, Plane, Sun as SunIcon, MapPin, Play } from 'lucide-react';
import { Button } from './ui/button';

interface DestinationModalProps {
  destination: string;
  country: string;
  imageUrl: string;
  price: number;
  bestMonth: string;
  cheapestMonth: string;
  cheapestPrice: number;
  bestWeatherTemp: string;
  insiderTip: string;
  priceRange: Array<{ month: string; price: number }>;
  onClose: () => void;
}

export function DestinationModal({
  destination,
  country,
  imageUrl,
  price,
  bestMonth,
  cheapestMonth,
  cheapestPrice,
  bestWeatherTemp,
  insiderTip,
  priceRange,
  onClose,
}: DestinationModalProps) {
  const maxPrice = Math.max(...priceRange.map(p => p.price));
  const minPrice = Math.min(...priceRange.map(p => p.price));

  const placesToStay = [
    { name: 'Luxury Beachfront Resort', rating: 4.5, price: 180, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400' },
    { name: 'City Center Hotel', rating: 4.2, price: 120, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
    { name: 'Boutique Hideaway', rating: 4.8, price: 210, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400' },
  ];

  const topThings = [
    { name: 'Boat party', price: 34, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
    { name: 'Local markets walking tour', price: 10, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400' },
    { name: 'Sunset drinks', price: 50, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  ];

  const travellerVideos = [
    { thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', username: '@traveller_jane', views: '12.5k' },
    { thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400', username: '@wanderlust_tom', views: '8.2k' },
    { thumbnail: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400', username: '@explore_sara', views: '15.1k' },
    { thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', username: '@beach_vibes', views: '22.3k' },
    { thumbnail: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400', username: '@sunset_chaser', views: '9.7k' },
    { thumbnail: 'https://images.unsplash.com/photo-1540202404-a2f2a7d7e1e7?w=400', username: '@local_guide', views: '18.4k' },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-[480px] bg-white z-50 overflow-y-auto shadow-2xl animate-[slideInRight_0.3s_ease-out]">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl">Explore {destination}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-64">
          <img
            src={imageUrl}
            alt={destination}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <span>When to visit</span>
              </div>
              <p className="text-lg">{bestMonth}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <SunIcon className="w-4 h-4" />
                <span>Best weather</span>
              </div>
              <p className="text-lg">{bestWeatherTemp}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Plane className="w-4 h-4" />
                <span>From</span>
              </div>
              <p className="text-lg">£{cheapestPrice} per flight</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>Location</span>
              </div>
              <p className="text-lg">{country}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Cheapest time to fly</h3>
              <Button variant="link" className="text-[#0770e3] p-0">Explore all</Button>
            </div>
            <div className="space-y-3">
              {priceRange.map((item, index) => {
                const barWidth = maxPrice === minPrice ? 50 : ((item.price - minPrice) / (maxPrice - minPrice)) * 100;
                const isCheapest = item.month === cheapestMonth.substring(0, 3);
                return (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-8">{item.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                      <div
                        className={`h-2 rounded-full ${isCheapest ? 'bg-green-500' : 'bg-[#0770e3]'}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-16 text-right">£{item.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Insider tip</h3>
            <p className="text-sm text-blue-800">{insiderTip}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Places to stay</h3>
              <Button variant="link" className="text-[#0770e3] p-0">Explore all</Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {placesToStay.map((place, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <img src={place.image} alt={place.name} className="w-full h-24 object-cover" />
                  <div className="p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-xs">{place.rating}</span>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-2 mb-1">{place.name}</p>
                    <p className="text-xs font-medium">£{place.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Discover new ends of town</h3>
              <span className="text-xs text-white bg-green-600 px-2 py-1 rounded">Sponsored by CityMapper</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">City Center</h4>
                <p className="text-sm text-gray-600">Walk through bustling streets filled with historic landmarks and local culture.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Coastal Area</h4>
                <p className="text-sm text-gray-600">Relax by the waterfront with stunning views and fresh seafood restaurants.</p>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">Get CityMapper app</Button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Top things to do</h3>
              <span className="text-xs text-white bg-green-600 px-2 py-1 rounded">Sponsored by GetYourGuide</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {topThings.map((thing, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <img src={thing.image} alt={thing.name} className="w-full h-24 object-cover" />
                  <div className="p-2">
                    <p className="text-sm font-medium">{thing.name}</p>
                    <p className="text-xs text-gray-600">£{thing.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-4">Watch traveller snaps and videos</h3>
            <div className="overflow-x-auto -mx-6 px-6">
              <div className="flex gap-3" style={{ width: 'max-content' }}>
                {travellerVideos.map((video, index) => (
                  <div key={index} className="relative w-32 h-56 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer flex-shrink-0">
                    <img src={video.thumbnail} alt={video.username} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-xs font-medium">{video.username}</p>
                      <p className="text-white/80 text-xs">{video.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">More places you'll love</h3>
              <Button variant="link" className="text-[#0770e3] p-0">Explore all</Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" alt="Paris" className="w-full h-24 object-cover" />
                <div className="p-2">
                  <p className="text-sm font-medium">Paris</p>
                  <p className="text-xs text-gray-600">From £65 per flight</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img src="https://images.unsplash.com/photo-1512753360435-329c4535a9a7?w=400" alt="Barcelona" className="w-full h-24 object-cover" />
                <div className="p-2">
                  <p className="text-sm font-medium">Barcelona</p>
                  <p className="text-xs text-gray-600">From £52 per flight</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img src="https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400" alt="Lisbon" className="w-full h-24 object-cover" />
                <div className="p-2">
                  <p className="text-sm font-medium">Lisbon</p>
                  <p className="text-xs text-gray-600">From £48 per flight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

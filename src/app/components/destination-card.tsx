import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Sun, Plane, Lightbulb } from 'lucide-react';

interface DestinationCardProps {
  destination: string;
  country: string;
  imageUrl: string;
  price: number;
  bestMonth: string;
  cheapestMonth: string;
  cheapestPrice: number;
  bestWeatherTemp: string;
  insiderTip: string;
  priceRange: { month: string; price: number }[];
  onExplore?: () => void;
}

export function DestinationCard({
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
  onExplore,
}: DestinationCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex gap-6 p-6 min-w-full">
      {/* Image */}
      <div className="w-80 h-64 flex-shrink-0 rounded-xl overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={destination}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-3xl mb-1">{destination}</h3>
          <p className="text-gray-600">{country}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-4 flex-1">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="w-5 h-5 text-[#0770e3]" />
              <h4 className="text-sm text-gray-700">Cheapest time to fly</h4>
            </div>
            <div className="text-2xl mb-1">{cheapestMonth}</div>
            <div className="text-sm text-gray-600">from <span className="text-green-600 font-semibold">£{cheapestPrice}</span> per person</div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-5 h-5 text-orange-500" />
              <h4 className="text-sm text-gray-700">Best time for weather</h4>
            </div>
            <div className="text-2xl mb-1">{bestMonth}</div>
            <div className="text-sm text-gray-600">Average temperature: <span className="font-semibold">{bestWeatherTemp}</span></div>
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-3 mb-4">
          <div className="flex gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Insider tip:</span> {insiderTip}
            </p>
          </div>
        </div>

        {/* Price Timeline */}
        <div className="mb-4">
          <h4 className="text-xs text-gray-600 mb-2">Browse by month</h4>
          <div className="flex gap-1 mb-1">
            {priceRange.map((item, index) => {
              const minPrice = Math.min(...priceRange.map(p => p.price));
              const maxPrice = Math.max(...priceRange.map(p => p.price));
              const heightPercent = ((item.price - minPrice) / (maxPrice - minPrice)) * 60 + 40;
              const isLowest = item.price === minPrice;

              return (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-12 group relative">
                  <div
                    className={`w-full rounded-t transition-all cursor-pointer ${
                      isLowest ? 'bg-[#0770e3]' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <div className="absolute -top-6 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    £{item.price}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            {priceRange.map((item, index) => (
              <div key={index} className="flex-1 text-center">{item.month}</div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Button className="bg-[#0770e3] hover:bg-[#0553b5] text-white px-6 py-2 rounded-md text-sm">
            Find flights from £{cheapestPrice}
          </Button>
          <Button
            variant="outline"
            className="px-6 py-2 rounded-md border-gray-300 text-sm"
            onClick={onExplore}
          >
            Discover {destination}
          </Button>
        </div>
      </div>
    </div>
  );
}

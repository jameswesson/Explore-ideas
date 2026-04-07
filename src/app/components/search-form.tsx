import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plane, Hotel, Car, Palmtree, ArrowLeftRight, Globe, Calendar, Compass } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

export function SearchForm() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<'return' | 'one-way'>('return');
  const [from, setFrom] = useState('London (Any)');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isEverywhere, setIsEverywhere] = useState(false);
  const [isAnytime, setIsAnytime] = useState(false);

  const handleAnytimeClick = () => {
    setDepartDate('Anytime');
    setReturnDate('');
    setIsAnytime(true);
  };

  const handleSearch = () => {
    navigate('/explore', { state: { isAnytime } });
  };

  const handleEverywhereClick = () => {
    setTo('Everywhere');
    setIsEverywhere(true);
  };

  return (
    <div className="w-full max-w-6xl">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full">
          <Plane className="w-5 h-5" />
          Flights
        </button>
        <button className="flex items-center gap-2 bg-transparent text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10">
          <Hotel className="w-5 h-5" />
          Hotels
        </button>
        <button className="flex items-center gap-2 bg-transparent text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10">
          <Car className="w-5 h-5" />
          Cars
        </button>
        <button className="flex items-center gap-2 bg-transparent text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10">
          <Palmtree className="w-5 h-5" />
          Packages
        </button>
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-transparent text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 relative"
        >
          <Compass className="w-5 h-5" />
          Explore
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-2 py-0.5 rounded">New</span>
        </button>
      </div>

      {/* Hero Text */}
      <h1 className="text-5xl text-white mb-8">
        Millions of cheap flights. One simple search.
      </h1>

      {/* Trip Type Selector */}
      <div className="mb-4">
        <select
          value={tripType}
          onChange={(e) => setTripType(e.target.value as 'return' | 'one-way')}
          className="bg-transparent text-white border border-white/30 px-4 py-2 rounded-lg"
        >
          <option value="return" className="text-gray-900">Return</option>
          <option value="one-way" className="text-gray-900">One-way</option>
        </select>
      </div>

      {/* Search Form */}
      <div className="flex gap-0 bg-white rounded-lg overflow-hidden shadow-lg">
        {/* From */}
        <div className="flex-1 p-4 border-r border-gray-200">
          <label className="text-sm text-gray-600 mb-1 block">From</label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full outline-none text-gray-900"
            placeholder="Country, city or airport"
          />
        </div>

        {/* Swap */}
        <div className="flex items-center justify-center px-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        {/* To */}
        <div className="flex-1 p-4 border-r border-gray-200">
          <label className="text-sm text-gray-600 mb-1 block">To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full outline-none text-gray-900"
            placeholder="Country, city or airport"
          />
          {!isEverywhere && (
            <button
              onClick={handleEverywhereClick}
              className="text-blue-600 text-sm mt-1 flex items-center gap-1 hover:underline"
            >
              <Globe className="w-4 h-4" />
              Everywhere
            </button>
          )}
        </div>

        {/* Depart */}
        <div className="flex-1 p-4 border-r border-gray-200">
          <label className="text-sm text-gray-600 mb-1 block">Depart</label>
          <input
            type="text"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="w-full outline-none text-gray-900"
            placeholder="Add date"
          />
          {!isAnytime && (
            <button
              onClick={handleAnytimeClick}
              className="text-blue-600 text-sm mt-1 flex items-center gap-1 hover:underline"
            >
              <Calendar className="w-4 h-4" />
              Anytime
            </button>
          )}
        </div>

        {/* Return */}
        <div className="flex-1 p-4 border-r border-gray-200">
          <label className="text-sm text-gray-600 mb-1 block">Return</label>
          <input
            type="text"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full outline-none text-gray-900"
            placeholder="Add date"
            disabled={isAnytime}
          />
        </div>

        {/* Travellers */}
        <div className="flex-1 p-4 border-r border-gray-200">
          <label className="text-sm text-gray-600 mb-1 block">Travellers and cabin class</label>
          <div className="text-gray-900">1 Adult, Economy</div>
        </div>

        {/* Search Button */}
        <div className="flex items-center px-4">
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg h-auto"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Options */}
      <div className="flex gap-6 mt-4 text-white">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="add-nearby-from" className="border-white data-[state=checked]:bg-blue-600" />
          <span className="text-sm">Add nearby airports</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="add-nearby-to" className="border-white data-[state=checked]:bg-blue-600" />
          <span className="text-sm">Add nearby airports</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="direct-flights" className="border-white data-[state=checked]:bg-blue-600" />
          <span className="text-sm">Direct flights</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer ml-auto">
          <Checkbox id="add-hotel" defaultChecked className="border-white data-[state=checked]:bg-blue-600" />
          <span className="text-sm">Add a hotel</span>
        </label>
      </div>
    </div>
  );
}

import { Link } from 'react-router';
import { Sun, Heart, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="w-full py-4 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-white">
            <Sun className="w-8 h-8" />
            <span className="text-2xl">Skyscanner</span>
          </div>
        </Link>

        <div className="flex items-center gap-6 text-white">
          <button className="hover:opacity-80">Help</button>
          <button className="hover:opacity-80">
            <Sun className="w-6 h-6" />
          </button>
          <button className="hover:opacity-80">
            <Heart className="w-6 h-6" />
          </button>
          <button className="flex items-center gap-2 hover:opacity-80">
            <User className="w-6 h-6" />
            <span>Log in</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

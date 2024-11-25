import { Bell, ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-50 rounded-lg">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l">
          <img
            src="/api/placeholder/32/32"
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Admin</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

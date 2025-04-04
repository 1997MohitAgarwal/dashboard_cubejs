import { Calendar, ChevronDown, ToggleLeft } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <header className="border border-gray-300 mt-2 mx-4 py-3 px-6 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col">
          {/* Quick Commerce Title */}
          <span className="text-lg font-semibold text-gray-900">
            Quick Commerce
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Toggle Switch */}
          <button className="text-green-600 px-4 py-1 border border-gray-300 rounded-lg">
            <ToggleLeft className="w-6 h-6" />
          </button>

          {/* Calendar Icon */}
          <button className="text-gray-600"></button>

          {/* Date Range Dropdown */}
          <div className="relative">
            <button className="flex items-center px-4 py-1.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Aug 01, 2024 - Aug 03, 2024</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </header>
      <div className="border border-gray-300 mx-4 pt-2 pb-2 px-4">
        <div className="inline-flex">
          <span className="flex items-center space-x-4 py-1 px-1 border border-gray-300 rounded-xl">
            <button style={{backgroundColor:"#DFEAE8"}} className="flex items-center px-4 py-1.5 text-green-700 rounded-xl">
              <img
                src="/assets/images/image 54.svg"
                alt="Blinkit Logo"
                className="w-8 h-8 mr-1"
              />
              <span className="text-sm">Blinkit</span>
            </button>

            <button disabled={true} className="flex opacity-20 items-center px-4 py-1.5 text-purple-700 rounded-xl">
              <img
                src="/assets/images/image 55.svg"
                alt="Zepto Logo"
                className="w-8 h-8 mr-1 rounded-md"
              />
              <span className="text-sm">Zepto</span>
            </button>

            <button disabled={true} className="flex opacity-20 items-center px-4 py-1.5 text-orange-700 rounded-xl">
              <img
                src="/assets/images/image 57.svg"
                alt="Instamart Logo"
                className="w-8 h-8 mr-1 rounded-md"
              />
              <span className="text-sm">Instamart</span>
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;

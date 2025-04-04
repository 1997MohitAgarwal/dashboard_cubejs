"use client";

import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Home,
  BarChart2,
  Layers,
  HelpCircle,
  Settings,
  Plus,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const [channelsExpanded, setChannelsExpanded] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar Container */}
      <aside className="flex w-72 bg-white">
        {/* First Column - Icons */}
        <div className="w-20 bg-white flex flex-col items-center py-3">
          <div className="flex flex-col items-center gap-6">
            {/* Perfora Logo */}
            <img
              src="/assets/images/image 22.svg" // Replace with actual path to Perfora logo
              alt="Perfora Logo"
              className="w-12 h-12"
            />
            {/* Mamaearth Logo */}
            <img
              src="/assets/images/image 23.svg" // Replace with actual path to Mamaearth logo
              alt="Mamaearth Logo"
              className="w-12 h-12"
            />
            {/* Boat Logo */}
            <img
              src="/assets/images/image 24.svg" // Replace with actual path to Boat logo
              alt="Boat Logo"
              className="w-12 h-12 rounded-xl"
            />
            {/* Plus Icon */}
            <button className="rounded-full w-12 h-12 border border-gray-300 bg-white flex items-center justify-center">
              <Plus className="h-5 w-5 text-green-500" />
            </button>
          </div>
          <div className="mt-auto mb-4 flex flex-col items-center gap-4">
            {/* People Icon */}
            <button className="rounded-full w-10 h-10 flex items-center justify-center">
              <Users className="h-5 w-5 text-gray-600" />
            </button>
            {/* Profile Picture */}
            <div className="h-10 w-10 bg-purple-600 text-white rounded-full flex items-center justify-center">
              <span className="text-sm">MA</span>
            </div>
          </div>
        </div>

        {/* Second Column - Navigation */}
        <div className="w-56 bg-gray-50 flex flex-col">
          {/* Brand Header */}
          <div className="flex items-center justify-between bg-white text-black p-3 rounded-t-md mb-6">
            <div className="flex gap-6 items-center py-2 px-5 border rounded-xl">
              <span className="text-sm font-semibold">
                <span className="py-1 px-1.5 bg-teal-400 text-white rounded-md mr-3">
                  MA
                </span>
                Test_brand
              </span>
              <div className="flex flex-col">
                <ChevronUp className="h-3 w-4" />
                <ChevronDown className="h-3 w-4" />
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2 px-3">
            <a
              href="#"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-teal-400 rounded-md"
            >
              <Home className="h-5 w-5 mr-3" />
              <span className="text-sm">Overview</span>
            </a>

            <div className="relative">
              <button
                onClick={() => setChannelsExpanded(!channelsExpanded)}
                className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-gray-100 hover:text-teal-400 rounded-md"
              >
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-3" />
                  <span className="text-sm">Channels</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    channelsExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {channelsExpanded && (
                <div className="ml-8 space-y-2 mt-2">
                  <a
                    href="#"
                    className="block p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-400 rounded"
                  >
                    Meta Ads
                  </a>
                  <a
                    href="#"
                    className="block p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-400 rounded"
                  >
                    Google Ads
                  </a>
                  <a
                    href="#"
                    className="block p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-400 rounded"
                  >
                    Quick Commerce
                  </a>
                </div>
              )}
            </div>

            <a
              href="#"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-teal-400 rounded-md"
            >
              <Layers className="h-5 w-5 mr-3" />
              <span className="text-sm">Creatives</span>
            </a>
          </nav>

          {/* Footer Items */}
          <div className="mt-auto border-t pt-3 pb-4 px-3">
            <a
              href="#"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-teal-400 rounded-md"
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              <span className="text-sm">Help</span>
            </a>
            <a
              href="#"
              className="flex items-center p-3 text-purple-600 hover:bg-gray-100 hover:text-purple-600 rounded-md"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className="text-sm">Settings</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

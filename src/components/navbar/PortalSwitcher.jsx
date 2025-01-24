"use client";

import { useState } from 'react';
import Image from 'next/image';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function PortalSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const portals = [
    {
      name: "Chat Assistant",
      icon: "/assets/icons/machine-learning_18057653.png",
      path: "/chat",
      description: "AI chat assistance for vehicle support"
    },
    {
      name: "Vehicle Dashboard",
      icon: "/assets/icons/dashboard_16597209.png",
      path: "/vehicle_management/portal",
      description: "Monitor vehicle health and performance"
    },
    {
      name: "Diagnostics",
      icon: "/assets/icons/car_repair.png",
      path: "/vehicle_management/portal/home",
      description: "Vehicle diagnostics and alerts"
    },
    {
      name: "Route Navigation",
      icon: "/assets/icons/map.svg",
      path: "/route",
      description: "Vehicle Route Navigation"
    }
  ];

  return (
    <>
      {/* Floating Portal Switcher Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-2 left-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 z-50"
      >
        <LayoutGrid className="w-5 h-5 text-gray-700" />
      </button>

      {/* Portal Selector Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            
            <h2 className="text-xl font-semibold mb-4">Switch Portal</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portals.map((portal) => (
                <Link 
                  key={portal.name}
                  href={portal.path}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={portal.icon}
                        alt={`${portal.name} icon`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{portal.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{portal.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
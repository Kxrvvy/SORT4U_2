import React, { useState, useEffect } from 'react';
import Navbar from '../../feature/navbar';
import { TrendingUp, Camera } from 'lucide-react';

export default function HomeDashboard() {

  // --- BACKEND READY STATE(KUHA SA AI) ---
  // This object structure allows you to easily plug in a fetch() call
  const [userData, setUserData] = useState({
    calories: [40, 60, 40, 75], // Percentages for the bars
    budget: [90, 45, 30, 85],
    memories: [1, 2, 3, 4],     // Placeholder for memory items
    name: "John Doe"            // Can be passed to Profile component if needed
  });

  // Example of where you'd put your backend logic:
  /*
  useEffect(() => {
    fetch('/api/user/dashboard-data')
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []);
  */

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-800">
      {/* Sidebar - Positioned fixed inside the component */}
      <Navbar />

      {/* MAIN CONTENT AREA 
          ml-0: Full width on mobile
          lg:ml-64: Push content to the right only on large screens (desktop)
      */}
      <main className="flex-1 ml-0 lg:ml-64 p-6 md:p-10 lg:p-12 min-w-0 transition-all duration-300">
        
        <header className="mb-10 mt-12 lg:mt-0 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
            Your Dashboard
          </h1>
        </header>

        {/* --- TOP ROW --- */}
        {/* grid-cols-1: Stacked on mobile | xl:grid-cols-2: Side-by-side on extra large */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 mb-8">
          
          {/* Calorie Tracker */}
          <section className="bg-gray-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 min-h-[200px]">
            <h2 className="text-xl font-bold mb-6 text-gray-700">Calorie Tracker</h2>
            {/* Component content goes here */}
          </section>

          {/* Memory Lane */}
          <section className="bg-gray-500 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-white min-h-[200px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Camera size={20} /> Memory Lane
              </h2>
              <div className="w-14 h-4 bg-gray-400 rounded-full" />
            </div>
            {/* Component content goes here */}
          </section>
        </div>

        {/* --- BOTTOM ROW --- */}
        <section className="bg-gray-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-700">Budget Tracker</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-8">
               {/* Stat bars or info would go here */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatBar({ width }) {
  return (
    <div className="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner border border-gray-100">
      <div
        className="h-full bg-gray-600 rounded-full transition-all duration-1000 ease-out"
        style={{ width }}
      />
    </div>
  );
}
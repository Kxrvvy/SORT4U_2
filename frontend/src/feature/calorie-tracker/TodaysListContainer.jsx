import React from 'react';
import { Utensils } from 'lucide-react';

export default function TodaysListContainer({ items, onRemoveItem }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-gray-200 rounded-3xl p-8 flex flex-col" style={{ minHeight: '750px' }}>
      {/* Header */}
      <div className="text-center mb-6 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-1">TODAY'S LIST</h2>
        <p className="text-gray-600">{currentDate}</p>
        <div className="w-full border-t-2 border-dotted border-gray-400 mt-4"></div>
      </div>

      {/* Items List */}
      <div className="flex-1 flex flex-col gap-3">
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <p className="text-xl font-medium mb-2">No items yet</p>
            <p className="text-sm">Add some food to start</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-gray-600" />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    {item.calories > 0 && (
                      <span className="text-sm text-gray-600 ml-2">
                        ({item.calories} cal)
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer Text */}
        <div className="mt-9 pt-3 border-t-2 border-dotted border-gray-400 flex-shrink-0">
          <p className="text-center text-sm text-gray-600">
            Thank you for tracking!
          </p>
        </div>
    </div>
    
  );
}
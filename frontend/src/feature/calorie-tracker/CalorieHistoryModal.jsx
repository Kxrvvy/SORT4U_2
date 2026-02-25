import React from 'react';
import { X } from 'lucide-react';

export default function CalorieHistoryModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Calorie History</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg mb-2">No history data yet</p>
          <p className="text-sm">Your calorie tracking history will appear here</p>
        </div>

        {/* TODO: Add history list here when data is available */}
      </div>
    </div>
  );
}
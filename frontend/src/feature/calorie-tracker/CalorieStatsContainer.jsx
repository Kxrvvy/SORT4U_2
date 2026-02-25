import React, { useState } from 'react';
import { Flame, Flag, Utensils } from 'lucide-react';
import CalorieHistoryModal from './CalorieHistoryModal';

export default function CalorieStatsContainer({ 
  baseGoal, 
  foodCount, 
  totalCalories, 
  macros, 
  onUpdateBaseGoal 
}) {
  const [showHistory, setShowHistory] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [editGoalValue, setEditGoalValue] = useState(baseGoal);

  const handleGoalSave = () => {
    const newGoal = parseInt(editGoalValue) || 2890;
    onUpdateBaseGoal(newGoal);
    setIsEditingGoal(false);
  };

  const handleGoalCancel = () => {
    setEditGoalValue(baseGoal);
    setIsEditingGoal(false);
  };

  // Circle calculations
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const progress = (totalCalories / baseGoal) * circumference;

  return (
    <>
      <div className="bg-gray-200 rounded-4xl p-4">
        {/* Top Section - Base Goal & Food */}
        <div className="flex justify-between items-start mb-8">
          {/* Base Goal */}
          <div className="flex items-start gap-3">
            <Flag className="w-6 h-6 mt-1" />
            <div>
              <p className="text-base font-medium text-gray-800">Base Goal</p>
              {isEditingGoal ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    value={editGoalValue}
                    onChange={(e) => setEditGoalValue(e.target.value)}
                    className="w-24 px-2 py-1 bg-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 text-xl font-semibold"
                    autoFocus
                  />
                  <button
                    onClick={handleGoalSave}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleGoalCancel}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingGoal(true)}
                  className="text-2xl font-semibold hover:text-gray-600 transition-colors"
                >
                  {baseGoal.toLocaleString()}
                </button>
              )}
            </div>
          </div>

          {/* Food Count */}
          <div className="flex items-start gap-3">
            <Utensils className="w-6 h-6 mt-1" />
            <div>
              <p className="text-base font-medium text-gray-800">Food</p>
              <p className="text-2xl font-semibold">{foodCount}</p>
            </div>
          </div>
        </div>

        {/* Main Layout: Circle on Left, Buttons on Right */}
        <div className="flex items-center gap-1">
          {/* Circle Display */}
          <div className="flex-shrink-0">
            <div className="relative w-80 h-80">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Circle */}
                <circle
                  cx="160"
                  cy="160"
                  r={radius}
                  stroke="#d1d5db"
                  strokeWidth="20"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="160"
                  cy="160"
                  r={radius}
                  stroke="#4b5563"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Flame className="w-16 h-16 mb-3 text-gray-700" />
                <p className="text-base font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Total Calories
                </p>
                <p className="text-7xl font-bold">{totalCalories}</p>
              </div>
            </div>
          </div>

          {/* Macro Display + History Button */}
          <div className="flex-1 space-y-4">
            {/* Macro Boxes Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Protein */}
              <div className="px-2 py-1 bg-gray-400 rounded-xl min-h-[10px] flex flex-col items-center justify-center">
                <p className="text-l font-bold">{macros.protein}g Protein</p>
              </div>

              {/* Carbs */}
              <div className="px-2 py-1 bg-gray-400 rounded-xl min-h-[10px] flex flex-col items-center justify-center">
                <p className="text-l font-bold">{macros.carbs}g Carbs</p>
              </div>

              {/* Fat */}
              <div className="px-2 py-1 bg-gray-400 rounded-xl min-h-[10px] flex flex-col items-center justify-center">
                <p className="text-l font-bold">{macros.fat}g Fat</p>
              </div>

              {/* Fiber */}
              <div className="px-2 py-1 bg-gray-400 rounded-xl min-h-[10px] flex flex-col items-center justify-center">
                <p className="text-l font-bold">{macros.fiber}g Fiber</p>
              </div>
            </div>

            {/* Calorie History Button */}
            <button
              onClick={() => setShowHistory(true)}
              className="w-full px-3 py-2 bg-gray-400 hover:bg-gray-500 rounded-xl transition-colors font-semibold text-base min-h-[10px]"
            >
              Calorie History
            </button>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <CalorieHistoryModal onClose={() => setShowHistory(false)} />
      )}
    </>
  );
}
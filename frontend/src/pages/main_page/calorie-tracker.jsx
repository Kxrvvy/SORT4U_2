import React, { useState } from 'react';
import Navbar from '../../feature/navbar';
import CalorieStatsContainer from '../../feature/calorie-tracker/CalorieStatsContainer';
import TodaysListContainer from '../../feature/calorie-tracker/TodaysListContainer';
import AddFoodContainer from '../../feature/calorie-tracker/AddFoodContainer';

export default function CalorieTracker() {
  // State Management
  const [baseGoal, setBaseGoal] = useState(2890);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [todaysList, setTodaysList] = useState([]);
  const [macros, setMacros] = useState({
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  });

  // Add food item
  const handleAddFood = (foodData) => {
    const newItem = {
      id: Date.now(),
      name: foodData.name || foodData,
      calories: foodData.calories || 0,
      protein: foodData.protein || 0,
      carbs: foodData.carbs || 0,
      fat: foodData.fat || 0,
      fiber: foodData.fiber || 0,
      timestamp: new Date().toISOString()
    };
    
    setTodaysList([...todaysList, newItem]);
    setFoodCount(foodCount + 1);
    setTotalCalories(prevTotal => prevTotal + newItem.calories);
    setMacros(prev => ({
      protein: prev.protein + newItem.protein,
      carbs: prev.carbs + newItem.carbs,
      fat: prev.fat + newItem.fat,
      fiber: prev.fiber + newItem.fiber
    }));
  };

  // Remove food item
  const handleRemoveItem = (id) => {
    const itemToRemove = todaysList.find(item => item.id === id);
    if (itemToRemove) {
      setTodaysList(todaysList.filter(item => item.id !== id));
      setFoodCount(Math.max(0, foodCount - 1));
      setTotalCalories(prevTotal => Math.max(0, prevTotal - itemToRemove.calories));
      setMacros(prev => ({
        protein: Math.max(0, prev.protein - itemToRemove.protein),
        carbs: Math.max(0, prev.carbs - itemToRemove.carbs),
        fat: Math.max(0, prev.fat - itemToRemove.fat),
        fiber: Math.max(0, prev.fiber - itemToRemove.fiber)
      }));
    }
  };

  // Update base goal
  const handleUpdateBaseGoal = (newGoal) => {
    setBaseGoal(newGoal);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-800 relative">
      <Navbar />
      
      {/* Main Content Area */}
      <div className="min-h-screen bg-white ml-66 p-8 flex-1">
        <div className="max-w-7xl mx-auto ">
          {/* Header */}
          <h1 className="text-4xl font-bold mb-8">Calorie Tracker</h1>

          {/* Main Grid Layout - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Container 1: Calorie Stats (Top-Left) */}
              <CalorieStatsContainer
                baseGoal={baseGoal}
                foodCount={foodCount}
                totalCalories={totalCalories}
                macros={macros}
                onUpdateBaseGoal={handleUpdateBaseGoal}
              />

              {/* Container 2: Add Food Input (Bottom-Left) */}
              <AddFoodContainer onAddFood={handleAddFood} />
            </div>

            {/* RIGHT COLUMN */}
            {/* Container 3: Today's List (Right Side) */}
            <TodaysListContainer
              items={todaysList}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
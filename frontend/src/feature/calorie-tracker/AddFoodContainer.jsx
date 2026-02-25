import React, { useState } from 'react';

export default function AddFoodContainer({ onAddFood }) {
  const [foodInput, setFoodInput] = useState('');

  const handleSubmit = () => {
    if (foodInput.trim()) {
      onAddFood(foodInput);
      setFoodInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="bg-gray-200 rounded-3xl p-8">
      <input
        type="text"
        value={foodInput}
        onChange={(e) => setFoodInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What did you eat? (e.g., grilled chicken breast)"
        className="w-full px-4 py-3 bg-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-600"
      />
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
      >
        Add Food
      </button>
    </div>
  );
}
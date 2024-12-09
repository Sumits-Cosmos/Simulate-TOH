import React, { useState } from "react";
import TowerOfHanoi from "./components/TowerofHanoi";;

const App = () => {
  const [numDiscs, setNumDiscs] = useState(2); 
  const [key, setKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCompletion = (isOptimized) => {
    setShowSuccess(true)
    setTimeout(() => {
      alert(
        isOptimized
          ? "✅ Successfully completed the Tower of Hanoi in the optimal number of moves!"
          : "✔️ Tower of Hanoi completed, but not in the optimal number of moves."
      );
    }, 100);
  };

  const handleNumDiscsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 2 && value <= 7) {
      setNumDiscs(value);
    } else {
      alert("Please enter a value between 3 and 7.");
    }
  };

  const handleReset = () => {
    setNumDiscs(2); 
    setKey((prevKey) => prevKey + 1); 
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Tower of Hanoi</h1>
      <div className="mb-6">
        <label className="mr-2">Number of Discs:</label>
        <input
          type="number"
          value={numDiscs}
          onChange={handleNumDiscsChange}
          min="2"
          max="7"
          className="w-16 p-1 text-center bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <TowerOfHanoi key={key} numDiscs={numDiscs} onComplete={handleCompletion} />
      
      {showSuccess &&  (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          ✅ Success!
        </div>
      )}

      <button
        onClick={handleReset}
        className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 focus:outline-none"
      >
        Reset
      </button>
   
    </div>
  );
};

export default App;

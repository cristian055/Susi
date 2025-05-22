import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PointsTracker: React.FC = () => {
  const { people, updatePoints, prizes } = useAppContext();
  const [animatingPersonId, setAnimatingPersonId] = useState<string | null>(null);

  const handlePointsChange = (personId: string, amount: number) => {
    updatePoints(personId, amount);
    
    // Trigger animation
    setAnimatingPersonId(personId);
    setTimeout(() => setAnimatingPersonId(null), 500);
  };

  const getEligiblePrizes = (points: number) => {
    return prizes
      .filter((prize) => prize.pointsRequired <= points)
      .sort((a, b) => b.pointsRequired - a.pointsRequired)[0];
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Points Tracker</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="grid grid-cols-4 gap-4 font-medium">
            <div className="col-span-2">Nombre</div>
            <div className="text-center">Puntos</div>
            <div className="text-center">Acciones</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {people.map((person) => {
            const topPrize = getEligiblePrizes(person.points);
            
            return (
              <div key={person.id} className="px-6 py-4">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium text-gray-800">{person.name}</div>
                    {topPrize && (
                      <div className="flex items-center mt-1 text-sm text-purple-600">
                        <Award size={16} className="mr-1" />
                        <span>Eligible para: {topPrize.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <span 
                      className={`font-bold text-xl ${
                        animatingPersonId === person.id 
                          ? 'animate-bounce text-purple-600' 
                          : 'text-gray-700'
                      }`}
                    >
                      {person.points}
                    </span>
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handlePointsChange(person.id, -1)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Decrease points"
                    >
                      <MinusCircle size={24} />
                    </button>
                    <button
                      onClick={() => handlePointsChange(person.id, 1)}
                      className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                      aria-label="Increase points"
                    >
                      <PlusCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PointsTracker;
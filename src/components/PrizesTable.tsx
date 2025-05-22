import React, { useState } from 'react';
import { Trash2, Award, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AddPrizeModal from './AddPrizeModal';

const PrizesTable: React.FC = () => {
  const { prizes, deletePrize } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animatingPrizeId, setAnimatingPrizeId] = useState<string | null>(null);

  const handleDeletePrize = (id: string) => {
    // Set animating ID before deleting
    setAnimatingPrizeId(id);
    setTimeout(() => {
      deletePrize(id);
      setAnimatingPrizeId(null);
    }, 300);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Premios Disponibles</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow hover:shadow-md transition-shadow duration-300"
        >
          <Plus size={18} className="mr-2" />
          Añadir Premio
        </button>
      </div>

      {prizes.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="grid grid-cols-12 gap-4 font-medium">
              <div className="col-span-4">Premio</div>
              <div className="col-span-2 text-center">Puntos</div>
              <div className="col-span-5">Descripción</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {prizes.map((prize) => (
              <div 
                key={prize.id} 
                className={`px-6 py-4 transition-opacity duration-300 ${
                  animatingPrizeId === prize.id ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center">
                    <Award size={20} className="text-purple-500 mr-2" />
                    <span className="font-medium text-gray-800">{prize.name}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {prize.pointsRequired} pts
                    </span>
                  </div>
                  <div className="col-span-5 text-gray-600 text-sm">
                    {prize.description}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => handleDeletePrize(prize.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete prize"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <Award size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No hay premios aún. ¡Añade uno para empezar!</p>
        </div>
      )}

      <AddPrizeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PrizesTable;
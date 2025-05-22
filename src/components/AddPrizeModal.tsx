import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AddPrizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPrizeModal: React.FC<AddPrizeModalProps> = ({ isOpen, onClose }) => {
  const { addPrize } = useAppContext();
  const [name, setName] = useState('');
  const [pointsRequired, setPointsRequired] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !pointsRequired || !description.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }
    
    const points = parseInt(pointsRequired, 10);
    if (isNaN(points) || points <= 0) {
      setError('Los puntos deben ser un número positivo');
      return;
    }

    // Add the prize
    addPrize({
      name: name.trim(),
      pointsRequired: points,
      description: description.trim(),
    });

    // Reset form and close modal
    setName('');
    setPointsRequired('');
    setDescription('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out"
        style={{animation: 'fadeInUp 0.3s ease-out'}}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Añadir Nuevo Premio</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Premio
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Ej: Día de Cine"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
              Puntos Requeridos
            </label>
            <input
              type="number"
              id="points"
              value={pointsRequired}
              onChange={(e) => setPointsRequired(e.target.value)}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Ej: 50"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Describe los detalles del premio"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-all duration-300"
            >
              Añadir Premio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrizeModal;
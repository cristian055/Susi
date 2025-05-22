import React from 'react';
import { Award } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <Award size={32} className="mr-3" />
          <h1 className="text-3xl font-bold tracking-tight">Sistema de Puntos y Premios</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
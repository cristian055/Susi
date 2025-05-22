import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import PointsTracker from './components/PointsTracker';
import PrizesTable from './components/PrizesTable';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8 space-y-10">
          <PointsTracker />
          <PrizesTable />
        </main>
        
        <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Sistema de Puntos y Premios</p>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
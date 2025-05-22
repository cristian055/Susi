import React, { createContext, useContext, useState, useEffect } from 'react';
import { Person, Prize } from '../types';

interface AppContextType {
  people: Person[];
  prizes: Prize[];
  updatePoints: (personId: string, amount: number) => void;
  addPrize: (prize: Omit<Prize, 'id'>) => void;
  deletePrize: (prizeId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>(() => {
    const savedPeople = localStorage.getItem('people');
    return savedPeople
      ? JSON.parse(savedPeople)
      : [
          { id: '1', name: 'Susana', points: 0 },
          { id: '2', name: 'Cristian', points: 0 },
        ];
  });

  const [prizes, setPrizes] = useState<Prize[]>(() => {
    const savedPrizes = localStorage.getItem('prizes');
    return savedPrizes
      ? JSON.parse(savedPrizes)
      : [
          {
            id: '1',
            name: 'Movie Night',
            pointsRequired: 50,
            description: 'Choose any movie and enjoy with popcorn',
          },
          {
            id: '2',
            name: 'Restaurant Dinner',
            pointsRequired: 100,
            description: 'Dinner at a restaurant of choice',
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem('prizes', JSON.stringify(prizes));
  }, [prizes]);

  const updatePoints = (personId: string, amount: number) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === personId
          ? { ...person, points: Math.max(0, person.points + amount) }
          : person
      )
    );
  };

  const addPrize = (prize: Omit<Prize, 'id'>) => {
    const newPrize: Prize = {
      ...prize,
      id: Date.now().toString(),
    };
    setPrizes((prevPrizes) => [...prevPrizes, newPrize]);
  };

  const deletePrize = (prizeId: string) => {
    setPrizes((prevPrizes) => prevPrizes.filter((prize) => prize.id !== prizeId));
  };

  return (
    <AppContext.Provider
      value={{
        people,
        prizes,
        updatePoints,
        addPrize,
        deletePrize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
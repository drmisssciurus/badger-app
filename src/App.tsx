import { useState } from 'react';
import BadgerForm from './BadgerForm';
import BadgerCard from './BadgerCard';

function App() {
  const [badgers, setBadgers] = useState<{ id: number; hp: number }[]>([]);

  const updateBadgerHP = (id: number, newHp: number) => {
    setBadgers(
      (prev) =>
        prev
          .map((badger) =>
            badger.id === id ? { ...badger, hp: newHp } : badger
          )
          .filter((badger) => badger.hp > 0) // Убираем барсуков с HP <= 0
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-title bg-red-800 text-center p-8">
        I WOULD LIKE TO BADGER!!!
      </h1>

      {badgers.length === 0 && <BadgerForm onCreate={setBadgers} />}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badgers.map((badger) => (
          <BadgerCard key={badger.id} {...badger} onUpdateHP={updateBadgerHP} />
        ))}
      </div>
    </div>
  );
}

export default App;

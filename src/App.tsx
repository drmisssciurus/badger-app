import { useState, useEffect } from 'react';
import BadgerForm from './BadgerForm';
import BadgerCard from './BadgerCard';

interface Badger {
  id: number;
  hp: number;
  name: string;
  bgColor: string;
}

function getInitialBadgers(): Badger[] {
  const stored = localStorage.getItem('badgers');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    } catch (err) {
      console.error('❌ Ошибка парсинга localStorage:', err);
    }
  }
  return [];
}

function App() {
  console.log('%cAPP MOUNTED', 'color: limegreen;');

  const [badgers, setBadgers] = useState<Badger[]>(getInitialBadgers);

  useEffect(() => {
    console.log('💾 Сохраняем в localStorage:', badgers);
    localStorage.setItem('badgers', JSON.stringify(badgers));
  }, [badgers]);

  const updateBadgerHP = (id: number, newHp: number) => {
    setBadgers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, hp: Math.max(0, newHp) } : b))
    );
  };

  const updateBadgerColor = (id: number, newColor: string) => {
    setBadgers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bgColor: newColor } : b))
    );
  };

  const updateBadgerName = (id: number, newName: string) => {
    setBadgers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, name: newName } : b))
    );
  };

  const deleteBadger = (id: number) => {
    setBadgers((prev) => prev.filter((b) => b.id !== id));
  };

  const createBadgers = (newBadgers: { id: number; hp: number }[]) => {
    console.log('🔥 СОЗДАЁМ НОВУЮ АРМИЮ:', newBadgers);
    const enriched = newBadgers.map((b) => ({
      ...b,
      name: 'Badger',
      bgColor: '#ffffff',
    }));
    setBadgers(enriched);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-title bg-red-800 text-center p-8">
        I WOULD LIKE TO BADGER!!!
      </h1>

      {/* форма появляется только если карточек нет */}
      {badgers.length === 0 && <BadgerForm onCreate={createBadgers} />}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badgers.map((badger) => (
          <BadgerCard
            key={badger.id}
            id={badger.id}
            hp={badger.hp}
            name={badger.name}
            bgColor={badger.bgColor}
            onUpdateHP={updateBadgerHP}
            onDelete={deleteBadger}
            onUpdateColor={updateBadgerColor}
            onUpdateName={updateBadgerName}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';
import { NeatGradient } from '@firecms/neat';
import { neatConfig } from './neatConfig';
import BadgerForm from './BadgerForm';
import BadgerCard from './BadgerCard';

interface Badger {
  id: number;
  hp: number;
  maxHp: number;
  name: string;
  bgColor: string;
  isDead: boolean;
}

function getInitialBadgers(): Badger[] {
  const stored = localStorage.getItem('badgers');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map((b: any) => ({
          ...b,
          maxHp: typeof b.maxHp === 'number' ? b.maxHp : b.hp,
          isDead: typeof b.isDead === 'boolean' ? b.isDead : b.hp === 0,
        }));
      }
    } catch (err) {
      console.error('parsing error localStorage:', err);
    }
  }
  return [];
}

function App() {
  console.log('app mounted', 'color: limegreen;');

  const [badgers, setBadgers] = useState<Badger[]>(getInitialBadgers);

  // NEAT gradient setup
  const gradientRef = useRef<HTMLCanvasElement | null>(null);
  const neatInstance = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (!gradientRef.current) return;
    neatInstance.current = new NeatGradient({
      ref: gradientRef.current,
      ...neatConfig,
    });
    return () => {
      neatInstance.current?.destroy();
      neatInstance.current = null;
    };
  }, []);

  useEffect(() => {
    console.log('save in localStorage:', badgers);
    localStorage.setItem('badgers', JSON.stringify(badgers));
  }, [badgers]);

  const updateBadgerHP = (id: number, newHpRaw: number) => {
    setBadgers((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const clamped = Math.max(0, Math.min(newHpRaw, b.maxHp));
        return { ...b, hp: clamped, isDead: clamped === 0 };
      })
    );
  };

  const setBadgerDead = (id: number, dead: boolean) => {
    setBadgers((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              isDead: dead,
              hp: dead ? 0 : Math.max(1, Math.min(b.hp, b.maxHp)),
            }
          : b
      )
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
    const enriched = newBadgers.map((b) => ({
      ...b,
      name: `Badger #${b.id}`,
      bgColor: '#ffffff',
      maxHp: b.hp,
      isDead: b.hp === 0,
    }));
    setBadgers(enriched);
  };

  const deleteAllBadgers = () => {
    setBadgers([]);
  };

  return (
    <div className="relative min-h-screen p-8">
      {/* Neat gradient need canvas tag */}
      <canvas
        ref={gradientRef}
        className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen"
      />
      <h1 className="text-3xl font-title bg-red-800 text-center p-8 mb-3">
        I WOULD LIKE TO BADGER!!!
      </h1>
      {badgers.length === 0 && <BadgerForm onCreate={createBadgers} />}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badgers.map((badger) => (
          <BadgerCard
            key={badger.id}
            id={badger.id}
            hp={badger.hp}
            name={badger.name}
            bgColor={badger.bgColor}
            isDead={badger.isDead}
            onUpdateHP={updateBadgerHP}
            onMarkDead={setBadgerDead}
            onDelete={deleteBadger}
            onUpdateColor={updateBadgerColor}
            onUpdateName={updateBadgerName}
          />
        ))}
      </div>

      {badgers.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={deleteAllBadgers}
            className="bg-red-700 hover:bg-red-800 text-black px-6 py-2 rounded font-pixel text-lg"
          >
            DESTROY THEM ALL!!!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

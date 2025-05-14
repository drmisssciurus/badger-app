import { useState } from 'react';

interface Badger {
  id: number;
  hp: number;
}

interface Props {
  onCreate: (badgers: Badger[]) => void;
}

export default function BadgerForm({ onCreate }: Props) {
  const [count, setCount] = useState<string>('1');
  const [hp, setHp] = useState<string>('10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericCount = parseInt(count, 10);
    const numericHp = parseInt(hp, 10);

    if (isNaN(numericCount) || isNaN(numericHp)) return;

    const badgers = Array.from({ length: numericCount }, (_, i) => ({
      id: i + 1,
      hp: numericHp,
    }));
    onCreate(badgers);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-lg flex flex-wrap items-center gap-10"
    >
      <label className="block font-pixel text-lg">
        HOW MUCH YOU NEED FOR YOUR ARMY????
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          min="1"
          className="block w-full p-2 mt-1 border rounded"
        />
      </label>

      <label className="block font-pixel text-lg">
        HOW MUCH HP EACH HAAAVE???
        <input
          type="text"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          min="1"
          className="block w-full p-2 mt-1 border rounded"
        />
      </label>

      <button
        type="submit"
        className="mt-4 bg-red-700 font-pixel text-black px-10 py-2 rounded text-lg"
      >
        CREATE THE CREATURES!!!
      </button>
    </form>
  );
}

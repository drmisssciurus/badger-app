import { useState } from 'react';

interface Badger {
  id: number;
  hp: number;
}

interface Props {
  onCreate: (badgers: Badger[]) => void;
}

export default function BadgerForm({ onCreate }: Props) {
  const [count, setCount] = useState(1);
  const [hp, setHp] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const badgers = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      hp,
    }));
    onCreate(badgers);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-lg flex items-center gap-10"
    >
      <label className="block font-pixel text-lg">
        HOW MUCH YOU NEED FOR YOUR ARMY????
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          min="1"
          className="block w-full p-2 mt-1 border rounded"
        />
      </label>

      <label className="block font-pixel text-lg">
        HOW MUCH HP EACH HAAAVE???
        <input
          type="number"
          value={hp}
          onChange={(e) => setHp(Number(e.target.value))}
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

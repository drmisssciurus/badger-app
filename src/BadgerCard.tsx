interface BadgerProps {
  id: number;
  hp: number;
  onUpdateHP: (id: number, newHP: number) => void;
}

export default function BadgerCard({ id, hp, onUpdateHP }: BadgerProps) {
  return (
    <div className="p-4 border-amber-700 rounded shadow-md bg-white flex flex-col items-center">
      <div className="flex gap-10 items-center">
        <h2 className="text-3xl font-pixel font-bold">Badger #{id}</h2>
        <p className="text-gray-700 text-2xl font-pixel">HP: {hp}</p>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          className="bg-red-400 text-white px-3 py-1 rounded-2xl font-pixel text-lg"
          onClick={() => onUpdateHP(id, hp - 1)}
        >
          -1 HP
        </button>
        <button
          className="bg-green-400 text-white px-3 py-1 rounded-2xl font-pixel text-lg"
          onClick={() => onUpdateHP(id, hp + 1)}
        >
          +1 HP
        </button>
      </div>
    </div>
  );
}
